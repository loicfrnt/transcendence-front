import { Socket } from 'socket.io-client'
import { User } from '../types/user'

export default function sendGameInvite(user: User, socket: Socket): void {
  socket.emit('sendGameInvitation', { id: user.id.toString() })
}
