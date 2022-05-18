import { Route, Routes } from 'react-router-dom'
import { Socket } from 'socket.io-client'
import { User } from '../../types/user'
import Pong from './Pong'
import GameSpectate from './Spectate/GameSpectate'
interface Props {
  currUser: User
  socketChannel: Socket
}

export default function GameRoutes({ currUser, socketChannel }: Props) {
  return (
    <Routes>
      <Route
        index
        element={<Pong currUser={currUser} socketChannel={socketChannel} />}
      />
      <Route path=":username" element={<GameSpectate />} />
    </Routes>
  )
}
