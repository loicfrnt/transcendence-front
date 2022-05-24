import Avatar from '../../components/Avatar'
import { Channel, ProtoChannel } from '../../types/chat'
import { RelStatus, User } from '../../types/user'
import { ReactComponent as SvgDuel } from '../../assets/game.svg'
import { ReactComponent as SvgSpectate } from '../../assets/eye.svg'
import { ReactComponent as SvgAddFriend } from '../../assets/addFriend.svg'
import { ReactComponent as SvgRmFriend } from '../../assets/rmFriend.svg'
import { ReactComponent as SvgBlock } from '../../assets/block.svg'
import sendGameInvite from '../../utils/sendGameInvite'
import { Socket } from 'socket.io-client'
import { useNavigate } from 'react-router-dom'
import userRelationshipService from '../../services/user-relationship.service'
import { useState } from 'react'
import isFriend from '../../utils/isFriend'

interface Props {
  channel: Channel
  currUser: User
  setCurrUser: React.Dispatch<React.SetStateAction<User>>
  setChannels: React.Dispatch<React.SetStateAction<ProtoChannel[]>>
  socket: Socket
}

export default function ConvInfoDm({
  channel,
  currUser,
  setCurrUser,
  setChannels,
  socket,
}: Props) {
  function dmButton(
    Svg: React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
    content: string,
    handleClick: React.MouseEventHandler<HTMLButtonElement>
  ) {
    return (
      <button
        onClick={handleClick}
        className="duration-300 group flex w-full items-center hover:bg-gray-light px-3 py-4 rounded-xl gap-5"
      >
        <Svg className="w-10 duration-300 fill-gray group-hover:fill-violet"></Svg>
        <span className="font-semibold text-lg">{content}</span>
      </button>
    )
  }
  const cUser = channel.channelUsers.find(
    (cUser) => cUser.user.id !== currUser.id
  )
  let navigate = useNavigate()

  const user = cUser!.user
  const [friend, setFriend] = useState(isFriend(currUser, user))

  function addFriend() {
    userRelationshipService
      .add(user.id, RelStatus.Pending)
      .then((resp) => console.log(resp))
  }

  function removeFriend() {
    userRelationshipService.delete(user!.id).then((response) => {
      localStorage.setItem('user', JSON.stringify(response.data))
      setCurrUser(response.data)
      setFriend(false)
    })
  }

  async function blockUser() {
    if (friend) {
      await userRelationshipService.delete(user!.id)
    }
    await userRelationshipService
      .add(user!.id, RelStatus.Blocked)
      .then((response) => {
        localStorage.setItem('user', JSON.stringify(response.data))
        setCurrUser(response.data)
        navigate('/chat')
        setChannels((channels) =>
          channels.filter((chan) => chan.id !== channel.id)
        )
      })
  }
  return (
    <div className="flex flex-col items-center w-full">
      <Avatar
        username={user.username}
        avatarId={user.avatar_id}
        size="h-[146px]"
        status={user.status}
      />
      <h1 className="font-semibold text-[2rem] leading-[3rem] mt-4">
        {user.username}
      </h1>
      <div className="flex flex-col mt-5 w-full px-2">
        {dmButton(SvgDuel, 'Duel', (e) => sendGameInvite(user, socket))}
        {dmButton(SvgSpectate, 'Spectate', (e) =>
          navigate('/game/' + user.username)
        )}
        {friend
          ? dmButton(SvgRmFriend, 'Remove Friend', removeFriend)
          : dmButton(SvgAddFriend, 'Add Friend', addFriend)}
        {dmButton(SvgBlock, 'Block User', blockUser)}
      </div>
    </div>
  )
}
