import Avatar from '../../components/Avatar'
import { Channel, ChannelUser, ProtoChannel } from '../../types/chat'
import { RelStatus, User } from '../../types/user'
import { ReactComponent as SvgDuel } from '../../assets/game.svg'
import { ReactComponent as SvgSpectate } from '../../assets/eye.svg'
import { ReactComponent as SvgAddFriend } from '../../assets/addFriend.svg'
import { ReactComponent as SvgRmFriend } from '../../assets/rmFriend.svg'
import { ReactComponent as SvgBlock } from '../../assets/block.svg'
import { ReactComponent as SvgMessage } from '../../assets/message.svg'
import { ReactComponent as SvgAdmin } from '../../assets/hammer.svg'
import { ReactComponent as AddSvg } from '../../assets/add.svg'
import { Link } from 'react-router-dom'
import ReactTooltip from 'react-tooltip'
import { useState } from 'react'
import { Socket } from 'socket.io-client'
import { useNavigate } from 'react-router-dom'
import getChannelUser from '../../utils/getChannelUser'
import PopUpBox from '../../components/PopUpBox'
import AdminPanel from './AdminPanel'
import { useEffect } from 'react'
import InviteMembers from './InviteMembers'
import dmUser from '../../utils/dmUser'
import userRelationshipService from '../../services/user-relationship.service'
import sendGameInvite from '../../utils/sendGameInvite'
import SocialNoItem from '../Profile/SocialNoItem'
import isFriend from '../../utils/isFriend'
import isBlocked from '../../utils/isBlocked'

interface UserButtonProps {
  Svg: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  tooltip: string
  handleClick: () => void
  id: string
}

function UserButton({ Svg, tooltip, handleClick, id }: UserButtonProps) {
  const [tooltipVisible, showTooltip] = useState(true)
  const hideTooltip = () => {
    showTooltip(false)
    setTimeout(() => showTooltip(true), 10)
  }
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
        onMouseLeave={() => hideTooltip()}
        onBlur={() => hideTooltip()}
      >
        <Svg className="h-4 fill-gray group-hover:fill-violet duration-300" />
      </button>
    </>
  )
}

// Renders for each conversation member
interface ConvMemberProps {
  cUser: ChannelUser
  currUser: User
  thisCUser: ChannelUser
  socket: Socket
  setChannels: React.Dispatch<React.SetStateAction<ProtoChannel[]>>
  setCurrUser: React.Dispatch<React.SetStateAction<User>>
}

function ConvMember({
  cUser,
  currUser,
  setCurrUser,
  thisCUser,
  socket,
  setChannels,
}: ConvMemberProps) {
  const user = cUser.user
  // User is not owner, and this User is admin or owner
  const isAdmin = cUser.role !== 3 && [2, 3].includes(thisCUser.role)
  const [adminPanelOpen, setAdminPanelOpen] = useState(false)
  let navigate = useNavigate()
  const [friend, setFriend] = useState(isFriend(currUser, user))

  function addFriend() {
    userRelationshipService
      .add(cUser.user.id, RelStatus.Pending)
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
      })
  }

  return (
    <>
      {isAdmin && adminPanelOpen && (
        <PopUpBox open={adminPanelOpen} setOpen={setAdminPanelOpen}>
          <AdminPanel cUser={cUser} socket={socket} />
        </PopUpBox>
      )}
      <Link
        to={'/profile/' + user.username}
        className="duration-300 hover:bg-gray-light  p-2 flex"
      >
        <Avatar
          username={user.username}
          avatarId={user.avatar_id}
          status={user.status}
          noLink
        />
        <div className="flex flex-col">
          <div className="flex gap-x-1 ml-2 items-center flex-wrap">
            <h2 className="font-semibold text-lg">{user.username}</h2>
            {cUser.role === 2 && <p className="text-sm text-gray"> - Admin</p>}
            {cUser.role === 3 && <p className="text-sm text-gray"> - Owner</p>}
            {cUser.sanction && <p className="text-sm text-gray"> - Mute</p>}
          </div>
          <div className="flex gap-2 ml-2">
            <UserButton
              Svg={SvgDuel}
              tooltip="Duel"
              id={`${cUser.id}duel`}
              handleClick={() => sendGameInvite(user, socket)}
            />
            <UserButton
              Svg={SvgSpectate}
              tooltip="Spectate"
              id={`${cUser.id}spectate`}
              handleClick={() => navigate('/game/' + cUser.user.username)}
            />

            {friend ? (
              <UserButton
                Svg={SvgRmFriend}
                tooltip="Remove Friend"
                id={`${cUser.id}rm`}
                handleClick={removeFriend}
              />
            ) : (
              <UserButton
                Svg={SvgAddFriend}
                tooltip="Add Friend"
                id={`${cUser.id}add`}
                handleClick={addFriend}
              />
            )}

            <UserButton
              Svg={SvgMessage}
              tooltip="Direct Message"
              id={`${cUser.id}dm`}
              handleClick={() => dmUser(user, socket, navigate, setChannels)}
            />
            {
              // If user is admin or owner
              isAdmin && (
                <UserButton
                  Svg={SvgAdmin}
                  tooltip="Admin Stuff"
                  id={`${cUser.id}admin`}
                  handleClick={() => setAdminPanelOpen(true)}
                />
              )
            }
            <UserButton
              Svg={SvgBlock}
              tooltip="Block User"
              id={`${cUser.id}blck`}
              handleClick={blockUser}
            />
          </div>
        </div>
      </Link>
    </>
  )
}

interface Props {
  channel: Channel
  currUser: User
  setCurrUser: React.Dispatch<React.SetStateAction<User>>
  socket: Socket
  setChannel: React.Dispatch<React.SetStateAction<Channel | undefined>>
  setChannels: React.Dispatch<React.SetStateAction<ProtoChannel[]>>
}

export function ConvInfoChannel({
  channel,
  currUser,
  setCurrUser,
  socket,
  setChannel,
  setChannels,
}: Props) {
  const currCUser = getChannelUser(channel, currUser)
  const otherUsers = channel.channelUsers
    .filter((user) => user !== currCUser)
    .filter((cUser) => cUser.sanction !== 'ban')
    .filter((cUser) => !isBlocked(currUser, cUser.user))

  const border = otherUsers.length ? 'border' : ''
  const [inviteOpen, setInviteOpen] = useState(false)

  useEffect(() => {
    const channelUserUpdated = (updatedUser: ChannelUser) => {
      setChannel((channel) => {
        if (!channel || updatedUser.channelId !== channel.id) return channel
        let newChannel = { ...channel }
        if (
          //try to update current user
          newChannel.channelUsers.some((user, index) => {
            if (user.id !== updatedUser.id) return false
            newChannel.channelUsers[index] = updatedUser
            return true
          }) === false
        ) {
          // push new user if it's not already present
          newChannel.channelUsers.push(updatedUser)
        }
        return newChannel
      })
    }
    socket.on('channel_user', channelUserUpdated)

    const userLeft = (leavingUser: ChannelUser) => {
      setChannel((channel) => {
        if (!channel) return channel
        let newChannel = { ...channel }
        newChannel.channelUsers = newChannel.channelUsers.filter(
          (user) => user.id !== leavingUser.id
        )
        return newChannel
      })
    }
    socket.on('left_channel', userLeft)

    return () => {
      socket.off('channel_user', channelUserUpdated)
      socket.off('left_channel', userLeft)
    }
  }, [channel, setChannel, socket])

  if (!currCUser) {
    return <p>Something went wrong...</p>
  }

  const popUp = () => {
    if (inviteOpen) {
      return (
        <PopUpBox open={inviteOpen} setOpen={setInviteOpen}>
          <InviteMembers
            currUser={currUser}
            socket={socket}
            channel={channel}
          />
        </PopUpBox>
      )
    }
  }

  return (
    <>
      {popUp()}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between mb-3">
          <h1 className="font-bold text-3xl mb">Members</h1>
          <AddSvg
            className="w-7 h-7 fill-gray hover:fill-violet duration-300"
            onClick={(e) => setInviteOpen(true)}
            cursor={'pointer'}
          />
        </div>
        <div
          className={`flex flex-col gap-0 rounded-3xl border-gray overflow-auto ${border}`}
        >
          {otherUsers.map((cUser) => (
            <ConvMember
              setChannels={setChannels}
              setCurrUser={setCurrUser}
              cUser={cUser}
              currUser={currUser}
              thisCUser={currCUser}
              socket={socket}
              key={cUser.id}
            />
          ))}
          {!otherUsers.length && <SocialNoItem msg="It's empty in here..." />}
        </div>
      </div>
    </>
  )
}
