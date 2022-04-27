import { useEffect, useRef } from 'react'
import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Channel } from '../../types/chat'
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
  const [channels, setChannels] = useState<Channel[]>([])
  const socket = useRef<Socket | null>(null)

  useEffect(() => {
    //HTTP
    chatServices.getChannels(setChannels)

    //WS
    socket.current = io(process.env.REACT_APP_BACK_LINK as string, {
      withCredentials: true,
    })

    return () => {
      socket.current?.close()
    }
  }, [])

  useEffect(() => {
    socket.current?.on('receive_message', (message) => {
      chatServices.receiveMessage(message, setChannels, channels)
    })
    return () => {
      socket.current?.off('receive_message')
    }
  }, [channels])

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ChannelNav
            thisUser={user}
            channels={channels}
            setChannels={setChannels}
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
