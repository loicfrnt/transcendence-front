import { ReactComponentElement } from 'react'
import Avatar from '../../components/Avatar'
import ContentBox from '../../components/ContentBox'
import { Channel, ChannelUser } from '../../types/chat'
import { User } from '../../types/user'
import { ReactComponent as SvgDuel } from '../../assets/game.svg'
import { ReactComponent as SvgAddFriend } from '../../assets/addFriend.svg'
import { ReactComponent as SvgRmFriend } from '../../assets/rmFriend.svg'
import { ReactComponent as SvgBlock } from '../../assets/block.svg'
import { Link } from 'react-router-dom'

interface Props {
  channel: Channel
  thisUser: User
}

//TEMPORARY
function isFriend(user: User, thisUser: User) {
  if (user.username === 'mechant') return true
  return false
}

export default function ConvInfo({ channel, thisUser }: Props) {
  function renderDmInfo() {
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
    const cUser = channel.channelUsers.find((cUser) => cUser.user !== thisUser)
    if (cUser === undefined) {
      return 'Something went wrong'
    }
    const user = cUser.user
    return (
      <div className="flex flex-col items-center w-full">
        <Avatar
          username={user.username}
          avatarId={user.avatar_id}
          size="h-[146px]"
        />
        <h1 className="font-semibold text-[2rem] leading-[3rem] mt-4">
          {user.username}
        </h1>
        <div className="flex flex-col mt-5 w-full px-2">
          {dmButton(SvgDuel, 'Duel', (e) => null)}
          {isFriend(user, thisUser)
            ? dmButton(SvgRmFriend, 'Remove Friend', (e) => null)
            : dmButton(SvgAddFriend, 'Add Friend', (e) => null)}
          {dmButton(SvgBlock, 'Block User', (e) => null)}
        </div>
      </div>
    )
  }

  function renderConvInfo() {
    function renderConvMember(cUser: ChannelUser) {
      function userButton(
        Svg: React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
        handleClick: React.MouseEventHandler<HTMLButtonElement>
      ) {
        return (
          <button
            onClick={handleClick}
            className="duration-300 border border-gray bg-white hover:bg-gray h-8 w-8 rounded-full flex items-center justify-center group"
          >
            <Svg className="h-4 fill-gray group-hover:fill-violet duration-300" />
          </button>
        )
      }

      const user = cUser.user
      if (user === thisUser) {
        return null
      }
      return (
        <Link
          to={'/profile/' + user.username}
          className="duration-300 hover:bg-gray-light  p-2 flex"
          key={cUser.id}
        >
          <Avatar username={user.username} avatarId={user.avatar_id} noLink />
          <div className="flex flex-col">
            <h2 className="font-semibold text-lg ml-2">{user.username}</h2>
            <div className="flex gap-2 ml-2">
              {userButton(SvgDuel, (e) => null)}
              {isFriend(user, thisUser)
                ? userButton(SvgRmFriend, (e) => null)
                : userButton(SvgAddFriend, (e) => null)}
              {userButton(SvgBlock, (e) => null)}
            </div>
          </div>
        </Link>
      )
    }

    return (
      <div className="flex flex-col gap-3">
        <h1 className="font-bold text-3xl mb">Members</h1>
        <div className="flex flex-col gap-0 border rounded-3xl border-gray overflow-auto">
          {channel.channelUsers.map(renderConvMember)}
        </div>
      </div>
    )
  }

  return (
    <ContentBox className="w-[400px] pt-5">
      {channel.status === 'direct_message' ? renderDmInfo() : renderConvInfo()}
    </ContentBox>
  )
}
