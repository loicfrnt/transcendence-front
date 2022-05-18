import Avatar from '../../components/Avatar'
import { ReactComponent as SvgArrow } from '../../assets/arrow.svg'
import { Channel, ChannelUser } from '../../types/chat'
import { Socket } from 'socket.io-client'

interface FriendProps {
  friend: ChannelUser
  channel: Channel
  socket: Socket
}
const Friend = ({ friend, socket, channel }: FriendProps) => {
  const user = friend.user
  const inviteMe = () => {
    console.log('???')
    socket.emit(
      'channel_invitation',
      { channelId: channel.id, invitedId: user.id },
      (result: any) => {
        console.log(result)
      }
    )
  }
  return (
    <button
      className="duration-300 hover:bg-gray-light p-2 flex items-center group"
      onClick={(e) => inviteMe()}
    >
      <Avatar username={user.username} avatarId={user.avatar_id} noLink={false} status={user.status}/>
      <div className="flex gap-x-1 mx-3 items-center flex-wrap justify-between w-full">
        <h2 className="font-semibold text-lg">{user.username}</h2>
        <SvgArrow className="h-4 group-hover:opacity-100 opacity-0 duration-150 fill-violet" />
      </div>
    </button>
  )
}

interface Props {
  friends: ChannelUser[]
  channel: Channel
  socket: Socket
}
export default function InviteMembers({ friends, socket, channel }: Props) {
  const border = friends.length ? 'border' : ''
  return (
    <div className="flex flex-col gap-3 min-w-[250px] max-w-[400px]">
      <h1 className="font-bold text-3xl mb">Invite Friends</h1>
      <div
        className={`flex flex-col gap-0 rounded-3xl border-gray overflow-auto ${border}`}
      >
        {friends.map((friend) => (
          <Friend
            friend={friend}
            socket={socket}
            channel={channel}
            key={friend.id}
          />
        ))}
        {!friends.length && <p>It's empty in here...</p>}
      </div>
    </div>
  )
}
