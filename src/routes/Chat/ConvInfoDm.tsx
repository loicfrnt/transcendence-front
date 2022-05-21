import Avatar from '../../components/Avatar'
import { Channel } from '../../types/chat'
import { User } from '../../types/user'
import { ReactComponent as SvgDuel } from '../../assets/game.svg'
import { ReactComponent as SvgSpectate } from '../../assets/eye.svg'
import { ReactComponent as SvgAddFriend } from '../../assets/addFriend.svg'
import { ReactComponent as SvgRmFriend } from '../../assets/rmFriend.svg'
import { ReactComponent as SvgBlock } from '../../assets/block.svg'
import sendGameInvite from '../../utils/sendGameInvite'
import { Socket } from 'socket.io-client'
import { useNavigate } from 'react-router-dom'

//TEMPORARY
function isFriend(user: User, thisUser: User) {
  if (user.username === 'mechant') return true
  return false
}

interface Props {
  channel: Channel
  thisUser: User
  socket: Socket
}

export default function ConvInfoDm({ channel, thisUser, socket }: Props) {
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
    (cUser) => cUser.user.id !== thisUser.id
  )
  let navigate = useNavigate()
  if (cUser === undefined) {
    return <span>Something went wrong</span>
  }
  const user = cUser.user
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
        {isFriend(user, thisUser)
          ? dmButton(SvgRmFriend, 'Remove Friend', (e) => null)
          : dmButton(SvgAddFriend, 'Add Friend', (e) => null)}
        {dmButton(SvgBlock, 'Block User', (e) => null)}
      </div>
    </div>
  )
}
