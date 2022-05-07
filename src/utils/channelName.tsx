import { Channel, ProtoChannel } from '../types/chat'
import { User } from '../types/user'

export default function channelName(
  channel: Channel | ProtoChannel,
  user: User
) {
  return channel.status !== 'direct_message'
    ? channel.name
    : channel.channelUsers?.find((u) => u.user.id !== user.id)?.user.username
}
