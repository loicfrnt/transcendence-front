import { Socket } from 'socket.io-client'
import Avatar from '../../components/Avatar'
import { ChannelUser } from '../../types/chat'

interface Props {
  cUser: ChannelUser
  socket: Socket | null
}
export default function AdminPanel({ cUser, socket }: Props) {
  const user = cUser.user
  const isAdmin = cUser.role == 2
  const titleStyle = 'font-semibold text-lg ml-2'
  return (
    <div className="flex flex-col gap-5">
      <div className="flex">
        <Avatar
          avatarId={user.avatar_id}
          username={user.username}
          size="h-8 w-8"
        />
        <h2 className="font-semibold text-lg ml-2">{user.username}</h2>
      </div>
      <div>
        <button
          className={`${titleStyle} rounded-full bg-gray-light p-3 hover:bg-violet hover:text-white duration-300 ease-in-out`}
          onClick={() =>
            socket?.emit(
              'manage_channel_user',
              {
                id: cUser.id,
                role: isAdmin ? 1 : 2,
              },
              (rep: any) => console.log(rep)
            )
          }
        >
          {isAdmin ? 'Revoke Admin' : 'Make Admin'}
        </button>
      </div>
      <div>
        <h2 className={titleStyle}>{user.username}</h2>
      </div>
    </div>
  )
}
