import { useEffect, useRef } from 'react'
import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Message, ProtoChannel } from '../../types/chat'
import { User } from '../../types/user'
import ChannelNav from './ChannelNav'
import ChatClose from './ChatClose'
import ChatOpen from './ChatOpen'
import chatServices from '../../services/chat.service'
import { io, Socket } from 'socket.io-client'

interface Props {
  user: User
}

function Chat({ user }: Props) {
  const [channels, setChannels] = useState<ProtoChannel[]>([])
  const [invitedChannels, setInvitedChannels] = useState<ProtoChannel[]>([])
  const socket = useRef<Socket | null>(null)

  useEffect(() => {
    //HTTP
    chatServices.getChannels(setChannels, setInvitedChannels)

    //WS
    socket.current = io(process.env.REACT_APP_BACK_LINK as string, {
      withCredentials: true,
    })

    socket.current.on('updated_channel', (data) => {
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

    socket.current.on('deleted_channel', (data) => {
      setChannels((channels) => {
        let newChannels = [...channels]
        return newChannels.filter((chan) => chan.id !== parseInt(data.id))
      })
    })

    socket.current.on('receive_message', (message: Message) => {
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

    socket.current?.on('user_banned', (channelId: number) => {
      setChannels((channels) => {
        return channels.filter((chan) => chan.id !== channelId)
      })
    })

    socket.current.on('invited_channels', (data) => {
      setInvitedChannels(data)
    })

    return () => {
      socket.current?.close()
    }
  }, [])

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ChannelNav
            thisUser={user}
            channels={channels}
            invitedChannels={invitedChannels}
            setChannels={setChannels}
            socket={socket.current}
          />
        }
      >
        <Route index element={<ChatClose />} />
        <Route
          path=":channelId"
          element={
            <ChatOpen
              thisUser={user}
              channels={channels}
              socket={socket.current}
              setChannels={setChannels}
            />
          }
        />
      </Route>
    </Routes>
  )
}

export default Chat
