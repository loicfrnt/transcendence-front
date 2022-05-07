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
  const socket = useRef<Socket | null>(null)

  useEffect(() => {
    //HTTP
    chatServices.getChannels(setChannels)

    //WS
    socket.current = io(process.env.REACT_APP_BACK_LINK as string, {
      withCredentials: true,
    })

    socket.current.on('updated_channel', (data) => {
      chatServices.getChannels(setChannels)
    })

    socket.current.on('deleted_channel', (data) => {
      chatServices.getChannels(setChannels)
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
