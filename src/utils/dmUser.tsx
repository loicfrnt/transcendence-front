import { NavigateFunction } from 'react-router-dom'
import { Socket } from 'socket.io-client'
import { User } from '../types/user'

export default function dmUser(
  user: User,
  socket: Socket | null,
  navigate: NavigateFunction
): void {
  socket?.emit(
    'get_direct_messages_channel',
    { id: user.id.toString() },
    (channel: any, err: any) => {
      console.log(channel, err)
      navigate('/chat/' + channel.id)
    }
  )
}
