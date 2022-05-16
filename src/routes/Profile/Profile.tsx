import { Route, Routes } from 'react-router-dom'
import { Socket } from 'socket.io-client'
import { User } from '../../types/user'
import UserProfile from './MyProfile'
import OtherProfile from './OtherProfile'

interface Props {
  thisUser: User
  setConnected: React.Dispatch<React.SetStateAction<boolean>>
  socket: Socket
}

export default function Profile({ thisUser, setConnected, socket }: Props) {
  return (
    <Routes>
      <Route
        index
        element={<UserProfile user={thisUser} setConnected={setConnected} />}
      />
      <Route
        path=":username"
        element={<OtherProfile user={thisUser} socket={socket} />}
      />
    </Routes>
  )
}
