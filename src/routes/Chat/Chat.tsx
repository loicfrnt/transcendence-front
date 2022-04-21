import { Route, Routes } from 'react-router-dom'
import { User } from '../../types/user'
import ChannelNav from './ChannelNav'
import ChatClose from './ChatClose'
import ChatOpen from './ChatOpen'

interface Props {
  user: User
}

function Chat({ user }: Props) {
  return (
    <Routes>
      <Route path="/" element={<ChannelNav thisUser={user} />}>
        <Route index element={<ChatClose />} />
        <Route path=":channelId" element={<ChatOpen thisUser={user} />} />
      </Route>
    </Routes>
  )
}

export default Chat
