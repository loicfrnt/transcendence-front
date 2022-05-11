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
import JoinChannel from './JoinChannel'
import { Socket } from 'socket.io-client'

interface Props {
  thisUser: User
  channels: ProtoChannel[]
  setChannels: React.Dispatch<React.SetStateAction<ProtoChannel[]>>
  socket: Socket | null
}

export default function ChannelNav({
  thisUser,
  channels,
  setChannels,
  socket,
}: Props) {
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

  function popUp() {
    if (newChanOpen)
      return (
        <PopUpBox
          open={newChanOpen}
          setOpen={setNewChanOpen}
          className="flex gap-10 flex-wrap justify-center"
        >
          <JoinChannel
            setChannels={setChannels}
            setIsOpen={setNewChanOpen}
            socket={socket}
          />
          <CreateChannel setChannels={setChannels} setIsOpen={setNewChanOpen} />
        </PopUpBox>
      )
  }

  return (
    <MainContainer>
      {popUp()}
      <div className="flex items-center justify-center sm:justify-start w-full h-full flex-wrap gap-y-6 pt-5">
        <ContentBox className="mb-4 w-[400px] max-h-[70vh] flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <h1 className={'text-[2rem] leading-[2.625rem] font-semibold'}>
              Conversations
            </h1>
            <AddSvg
              className="w-7 h-7 fill-gray hover:fill-violet duration-300"
              onClick={(e) => setNewChanOpen(true)}
              cursor={'pointer'}
            />
          </div>
          <div className="flex flex-col gap-2 overflow-hidden hover:overflow-auto">
            {channels
              .sort((a, b) => {
                let d1 = Date.parse(a.last_message_at)
                let d2 = Date.parse(b.last_message_at)
                return d2 - d1
              })
              .map(renderChannel)}
          </div>
        </ContentBox>
        <Outlet />
      </div>
    </MainContainer>
  )
}
