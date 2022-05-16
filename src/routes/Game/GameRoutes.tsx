import { Route, Routes } from 'react-router-dom'
import { User } from '../../types/user'
import Pong from './Pong'
import GameSpectate from './Spectate/GameSpectate'
interface Props {
  currUser: User
}

export default function GameRoutes({ currUser }: Props) {
  return (
    <Routes>
      <Route index element={<Pong currUser={currUser} />} />
      <Route path=":username" element={<GameSpectate />} />
    </Routes>
  )
}
