import { Socket } from 'socket.io-client'
import ContentBox from '../../components/ContentBox'
import { Channel, ProtoChannel } from '../../types/chat'
import { User } from '../../types/user'
import { ConvInfoChannel } from './ConvInfoChannel'
import ConvInfoDm from './ConvInfoDm'

interface Props {
  channel: Channel
  setChannel: React.Dispatch<React.SetStateAction<Channel | undefined>>
  setChannels: React.Dispatch<React.SetStateAction<ProtoChannel[]>>
  setCurrUser: React.Dispatch<React.SetStateAction<User>>
  currUser: User
  socket: Socket
}

export default function ConvInfo({
  channel,
  setChannel,
  setChannels,
  currUser,
  setCurrUser,
  socket,
}: Props) {
  if (channel.status !== 'direct_message')
    return (
      <ContentBox className="w-[400px] pt-5">
        <ConvInfoChannel
          channel={channel}
          setChannel={setChannel}
          setChannels={setChannels}
          setCurrUser={setCurrUser}
          currUser={currUser}
          socket={socket}
        />
      </ContentBox>
    )
  else
    return (
      <ContentBox className="w-[400px] pt-5">
        <ConvInfoDm
          channel={channel}
          setChannels={setChannels}
          currUser={currUser}
          setCurrUser={setCurrUser}
          socket={socket}
        />
      </ContentBox>
    )
}
