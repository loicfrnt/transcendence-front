import { Route, Routes } from 'react-router-dom'
import { Socket } from 'socket.io-client'
import { User } from '../../types/user'
import MyProfile from './MyProfile'
import OtherProfile from './OtherProfile'

interface Props {
  currUser: User
  setCurrUser: React.Dispatch<React.SetStateAction<User>>
  setConnected: React.Dispatch<React.SetStateAction<boolean>>
  socket: Socket
}

export default function Profile({
  currUser,
  setCurrUser,
  setConnected,
  socket,
}: Props) {
  return (
    <Routes>
      <Route
        index
        element={
          <MyProfile
            currUser={currUser}
            setCurrUser={setCurrUser}
            setConnected={setConnected}
          />
        }
      />
      <Route
        path=":username"
        element={
          <OtherProfile
            currUser={currUser}
            setCurrUser={setCurrUser}
            socket={socket}
          />
        }
      />
    </Routes>
  )
}
