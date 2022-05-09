import { Route, Routes } from 'react-router-dom'
import { User } from '../../types/user'
import UserProfile from './MyProfile'
import OtherProfile from './OtherProfile'

interface Props {
  thisUser: User
  setConnected: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Profile({ thisUser, setConnected }: Props) {
  return (
    <Routes>
      <Route></Route>
      <Route
        index
        element={<UserProfile user={thisUser} setConnected={setConnected} />}
      />
      <Route path=":username" element={<OtherProfile user={thisUser}/>} />
    </Routes>
  )
}
