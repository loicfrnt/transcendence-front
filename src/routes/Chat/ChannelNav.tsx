import { NavLink, Outlet } from 'react-router-dom'
import ContentBox from '../../components/ContentBox'
import MainContainer from '../../components/MainContainer'
import { Channel } from '../../types/chat'
import { User } from '../../types/user'
import channelName from '../../utils/channelName'

interface Props {
  thisUser: User
}

export default function ChannelNav({ thisUser }: Props) {
  const channels = thisUser.channels

  function renderChannel(channel: Channel) {
    const linkClass =
      'duration-300 rounded-3xl h-16 pl-5 w-full flex items-center '

    return (
      <div key={channel.id}>
        <NavLink
          to={'/chat/' + channel.id}
          className={({ isActive }) =>
            linkClass +
            (isActive
              ? 'bg-violet-light'
              : 'bg-gray-light hover:bg-violet-light')
          }
        >
          <h2 className="font-semibold text-xl">
            {channelName(channel, thisUser)}
          </h2>
        </NavLink>
      </div>
    )
  }

  return (
    <MainContainer>
      <div className="flex items-center justify-center sm:justify-start w-full h-full flex-wrap gap-y-6 pt-5">
        <ContentBox className="w-[400px] sm:h-[70vh]">
          <h1 className={'mb-4 text-[2rem] leading-[2.625rem] font-semibold'}>
            Conversations
          </h1>
          <div className="flex flex-col gap-3">
            {channels.map(renderChannel)}
          </div>
        </ContentBox>
        <Outlet />
      </div>
    </MainContainer>
  )
}
