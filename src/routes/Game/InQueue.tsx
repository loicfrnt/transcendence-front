import { Socket } from 'socket.io-client'
import Game from '../../types/game'
import WaitingFor from './WaitingFor'

interface FindMatchProps {
  setGame: React.Dispatch<React.SetStateAction<Game | null>>
  socket: Socket
}

export default function InQueue({ socket, setGame }: FindMatchProps) {
  return <WaitingFor message="Waiting for an oppenent" />
}
