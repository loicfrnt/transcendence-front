import { Channel } from '../types/chat'
import { User } from '../types/user'

export default function isOwner(user: User, channel: Channel) {
  return (
    channel.channelUsers.find((cUser) => cUser.user.id === user.id)?.role === 3
  )
}
