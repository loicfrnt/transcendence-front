import { useEffect } from 'react'
import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Channel } from '../../types/chat'
import { User } from '../../types/user'
import ChannelNav from './ChannelNav'
import ChatClose from './ChatClose'
import ChatOpen from './ChatOpen'
import chatServices from '../../services/chat.service'

interface Props {
  user: User
}

function Chat({ user }: Props) {
  const [channels, setChannels] = useState<Channel[]>([])

  useEffect(() => {
    chatServices.setChannels(setChannels)
  }, [])

  return (
    <Routes>
      <Route
        path="/"
        element={<ChannelNav thisUser={user} channels={channels} />}
      >
        <Route index element={<ChatClose />} />
        <Route
          path=":channelId"
          element={<ChatOpen thisUser={user} channels={channels} />}
        />
      </Route>
    </Routes>
  )
}

export default Chat
