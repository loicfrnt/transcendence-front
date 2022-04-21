import { Channel } from '../types/chat'
import { User } from '../types/user'

export default function channelName(channel: Channel, user: User) {
  return channel.status !== 'direct_message'
    ? channel.name
    : channel.channelUsers.find((u) => u.user !== user)?.user.username
}
