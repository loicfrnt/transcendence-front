import { useEffect } from 'react'
import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Message, ProtoChannel } from '../../types/chat'
import { User } from '../../types/user'
import ChannelNav from './ChannelNav'
import ChatClose from './ChatClose'
import ChatOpen from './ChatOpen'
import chatServices from '../../services/chat.service'
import { Socket } from 'socket.io-client'

interface Props {
  user: User
  setCurrUser: React.Dispatch<React.SetStateAction<User>>
  socket: Socket
}

function Chat({ user, setCurrUser, socket }: Props) {
  const [channels, setChannels] = useState<ProtoChannel[]>([])
  const [channelsLoaded, setChannelsLoaded] = useState(false)
  const [invitedChannels, setInvitedChannels] = useState<ProtoChannel[]>([])
  // const socket = useRef<Socket>(null)

  useEffect(() => {
    //HTTP
    chatServices.getChannels(setChannels, setInvitedChannels, setChannelsLoaded)

    //WS
    socket.on('updated_channel', (data) => {
      setChannels((channels) => {
        let newChannels = [...channels]
        channels.some((chan, idx) => {
          if (chan.id !== parseInt(data.id)) return false
          newChannels[idx].name = data.name ?? newChannels[idx].name
          newChannels[idx].status = data.status ?? newChannels[idx].status
          return true
        })
        return newChannels
      })
    })

    socket.on('deleted_channel', (data) => {
      setChannels((channels) => {
        let newChannels = [...channels]
        return newChannels.filter((chan) => chan.id !== parseInt(data.id))
      })
    })

    socket.on('receive_message', (message: Message) => {
      setChannels((channels) => {
        let newChannels = [...channels]
        newChannels.some((chan) => {
          if (message.channelId !== chan.id) return false
          chan.last_message_at = message.created_at
          return true
        })
        return newChannels
      })
    })

    socket.on('user_banned', (channelId: number) => {
      setChannels((channels) => {
        return channels.filter((chan) => chan.id !== channelId)
      })
    })

    socket.on('invited_channels', (data) => {
      setInvitedChannels(data)
    })

    return () => {
      socket.off('updated_channel')
      socket.off('deleted_channel')
      socket.off('receive_message')
      socket.off('user_banned')
      socket.off('invited_channels')
    }
  }, [socket])

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ChannelNav
            currUser={user}
            channels={channels}
            channelsLoaded={channelsLoaded}
            invitedChannels={invitedChannels}
            setChannels={setChannels}
            socket={socket}
          />
        }
      >
        <Route index element={<ChatClose />} />
        <Route
          path=":channelId"
          element={
            <ChatOpen
              currUser={user}
              setCurrUser={setCurrUser}
              channels={channels}
              socket={socket}
              setChannels={setChannels}
            />
          }
        />
      </Route>
    </Routes>
  )
}

export default Chat
