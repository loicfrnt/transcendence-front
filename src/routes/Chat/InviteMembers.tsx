import Avatar from '../../components/Avatar'
import { ReactComponent as SvgArrow } from '../../assets/arrow.svg'
import { Channel } from '../../types/chat'
import { Socket } from 'socket.io-client'
import { RelStatus, User } from '../../types/user'
import { useState } from 'react'
import usersService from '../../services/users.service'
import { useEffect } from 'react'
import Spinner from '../../components/Spinner'

interface FriendProps {
  user: User
  channel: Channel
  socket: Socket
}
const Friend = ({ user, socket, channel }: FriendProps) => {
  const inviteMe = () => {
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
      <div className="">
        <Avatar
          username={user.username}
          avatarId={user.avatar_id}
          status={user.status}
        />
      </div>
      <div className="flex gap-x-1 mx-3 items-center flex-wrap justify-between grow">
        <h2 className="font-semibold text-lg">{user.username}</h2>
        <SvgArrow className="h-4 group-hover:opacity-100 opacity-0 duration-150 fill-violet" />
      </div>
    </button>
  )
}

interface Props {
  currUser: User
  channel: Channel
  socket: Socket
}
export default function InviteMembers({ currUser, socket, channel }: Props) {
  const [friends, setFriends] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch friends
  useEffect(() => {
    const userInChannel = (user: User) => {
      return (
        channel.channelUsers.find((cUser) => cUser.user.id === user.id) !==
        undefined
      )
    }
    const getFriends = async () => {
      let friends: User[] = []
      if (currUser.received_relationships) {
        for (let relationship of currUser.received_relationships) {
          if (relationship.status === RelStatus.Friends) {
            const user = await usersService.getById(relationship.issuer_id)
            if (!friends.includes(user) && !userInChannel(user)) {
              friends.push(user)
            }
          }
        }
      }
      if (currUser.sent_relationships) {
        for (let relationship of currUser.sent_relationships) {
          if (relationship.status === RelStatus.Friends) {
            const user = await usersService.getById(relationship.receiver_id)
            if (!friends.includes(user) && !userInChannel(user)) {
              friends.push(user)
            }
          }
        }
      }
      setFriends(friends)
      setLoading(false)
    }
    getFriends()
  }, [
    currUser.received_relationships,
    currUser.sent_relationships,
    channel.channelUsers,
  ])

  const border = friends.length ? 'border' : ''
  return (
    <div className="flex flex-col gap-3 min-w-[250px] max-w-[400px]">
      <h1 className="font-bold text-3xl mb">Invite Friends</h1>
      {loading && <Spinner center />}
      <div
        className={`flex flex-col gap-0 rounded-3xl border-gray overflow-auto ${border}`}
      >
        {friends.map((friend) => (
          <Friend
            user={friend}
            socket={socket}
            channel={channel}
            key={friend.id}
          />
        ))}
        {!friends.length && !loading && <p>It's empty in here...</p>}
      </div>
    </div>
  )
}
