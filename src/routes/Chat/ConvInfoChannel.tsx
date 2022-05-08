import Avatar from '../../components/Avatar'
import { Channel, ChannelUser } from '../../types/chat'
import { User } from '../../types/user'
import { ReactComponent as SvgDuel } from '../../assets/game.svg'
import { ReactComponent as SvgAddFriend } from '../../assets/addFriend.svg'
import { ReactComponent as SvgRmFriend } from '../../assets/rmFriend.svg'
import { ReactComponent as SvgBlock } from '../../assets/block.svg'
import { ReactComponent as SvgMessage } from '../../assets/message.svg'
import { ReactComponent as SvgAdmin } from '../../assets/hammer.svg'
import { Link } from 'react-router-dom'
import ReactTooltip from 'react-tooltip'
import { useState } from 'react'
import { Socket } from 'socket.io-client'
import { useNavigate } from 'react-router-dom'
import getChannelUser from '../../utils/getChannelUser'

//TEMPORARY
function isFriend(user: User, thisUser: User) {
  if (user.username === 'mechant') return true
  return false
}

interface UserButtonProps {
  Svg: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  tooltip: string
  handleClick: () => void
  id: string
}

function UserButton({ Svg, tooltip, handleClick, id }: UserButtonProps) {
  const [tooltipVisible, showTooltip] = useState(true)
  return (
    <>
      {tooltipVisible && <ReactTooltip id={id} effect="solid" />}
      <button
        onClick={(e) => {
          e.preventDefault()
          handleClick()
        }}
        className="duration-300 border border-gray bg-white hover:bg-gray h-8 w-8 rounded-full flex items-center justify-center group"
        data-tip={tooltip}
        data-for={id}
        onMouseEnter={() => showTooltip(true)}
        onMouseLeave={() => {
          showTooltip(false)
          setTimeout(() => showTooltip(true), 10)
        }}
      >
        <Svg className="h-4 fill-gray group-hover:fill-violet duration-300" />
      </button>
    </>
  )
}

// Renders for each conversation member
interface ConvMemberProps {
  cUser: ChannelUser
  thisCUser: ChannelUser
  socket: Socket | null
}

function ConvMember({ cUser, thisCUser, socket }: ConvMemberProps) {
  const user = cUser.user
  let navigate = useNavigate()
  return (
    <Link
      to={'/profile/' + user.username}
      className="duration-300 hover:bg-gray-light  p-2 flex"
    >
      <Avatar username={user.username} avatarId={user.avatar_id} noLink />
      <div className="flex flex-col">
        <h2 className="font-semibold text-lg ml-2">{user.username}</h2>
        <div className="flex gap-2 ml-2">
          <UserButton
            Svg={SvgDuel}
            tooltip="Duel"
            id={`${cUser.id}duel`}
            handleClick={() => null}
          />
          {isFriend(user, thisCUser.user) ? (
            <UserButton
              Svg={SvgRmFriend}
              tooltip="Remove Friend"
              id={`${cUser.id}rm`}
              handleClick={() => null}
            />
          ) : (
            <UserButton
              Svg={SvgAddFriend}
              tooltip="Add Friend"
              id={`${cUser.id}add`}
              handleClick={() => null}
            />
          )}

          <UserButton
            Svg={SvgMessage}
            tooltip="Direct Message"
            id={`${cUser.id}dm`}
            handleClick={() => {
              socket?.emit(
                'get_direct_messages_channel',
                { id: user.id.toString() },
                (channel: any, err: any) => {
                  console.log(channel, err)
                  navigate('/chat/' + channel.id)
                }
              )
            }}
          />
          {
            // If user is admin or owner
            thisCUser.role === 2 ||
              (thisCUser.role === 3 && (
                <UserButton
                  Svg={SvgAdmin}
                  tooltip="Admin Stuff"
                  id={`${cUser.id}admin`}
                  handleClick={() => null}
                />
              ))
          }
          <UserButton
            Svg={SvgBlock}
            tooltip="Block User"
            id={`${cUser.id}blck`}
            handleClick={() => null}
          />
        </div>
      </div>
    </Link>
  )
}

interface Props {
  channel: Channel
  thisUser: User
  socket: Socket | null
}

export function ConvInfoChannel({ channel, thisUser, socket }: Props) {
  const thisCUser = getChannelUser(channel, thisUser)
  const otherUsers = channel.channelUsers.filter((user) => user !== thisCUser)
  const border = otherUsers.length ? 'border' : ''

  if (!thisCUser) {
    return <p>Something went wrong...</p>
  }

  return (
    <div className="flex flex-col gap-3">
      <h1 className="font-bold text-3xl mb">Members</h1>
      <div
        className={`flex flex-col gap-0 rounded-3xl border-gray overflow-auto ${border}`}
      >
        {otherUsers.map((cUser) => (
          <ConvMember
            cUser={cUser}
            thisCUser={thisCUser}
            socket={socket}
            key={cUser.id}
          />
        ))}
        {!otherUsers.length && <p>It's empty in here...</p>}
      </div>
    </div>
  )
}
