import { Channel, ChannelUser } from '../types/chat'
import { User } from '../types/user'

export default function getChannelUser(
  channel: Channel,
  user: User
): ChannelUser | undefined {
  return channel.channelUsers.find((cUser) => cUser.user.id === user.id)
}
