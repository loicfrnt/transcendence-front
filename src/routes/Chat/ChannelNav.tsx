import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import ContentBox from '../../components/ContentBox'
import MainContainer from '../../components/MainContainer'
import PopUpBox from '../../components/PopUpBox'
import { ProtoChannel } from '../../types/chat'
import { User } from '../../types/user'
import channelName from '../../utils/channelName'
import { ReactComponent as AddSvg } from '../../assets/add.svg'
import CreateChannel from './CreateChannel'

interface Props {
  thisUser: User
  channels: ProtoChannel[]
  setChannels: React.Dispatch<React.SetStateAction<ProtoChannel[]>>
}

export default function ChannelNav({ thisUser, channels, setChannels }: Props) {
  function renderChannel(channel: ProtoChannel) {
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
  const [newChanOpen, setNewChanOpen] = useState(false)

  return (
    <MainContainer>
      <PopUpBox open={newChanOpen} setOpen={setNewChanOpen}>
        <CreateChannel setChannels={setChannels} setIsOpen={setNewChanOpen} />
      </PopUpBox>
      <div className="flex items-center justify-center sm:justify-start w-full h-full flex-wrap gap-y-6 pt-5">
        <ContentBox className="mb-4 w-[400px] sm:h-[70vh]">
          <div className="flex items-center justify-between">
            <h1 className={'text-[2rem] leading-[2.625rem] font-semibold'}>
              Conversations
            </h1>
            <AddSvg
              className="w-7 h-7 fill-gray hover:fill-violet duration-300"
              onClick={(e) => setNewChanOpen(true)}
              cursor={'pointer'}
            />
          </div>
          <div className="flex flex-col gap-3">
            {channels.map(renderChannel)}
          </div>
        </ContentBox>
        <Outlet />
      </div>
    </MainContainer>
  )
}
