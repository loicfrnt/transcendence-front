import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Socket } from 'socket.io-client'
import ContentBox from '../../components/ContentBox'
import PopUpBox from '../../components/PopUpBox'
import { Channel, ProtoChannel } from '../../types/chat'
import { User } from '../../types/user'
import channelName from '../../utils/channelName'
import Conversation from './Conversation'
import ConvInfo from './ConvInfo'
import EditChannel from './EditChannel'
import { ReactComponent as EditSvg } from '../../assets/edit.svg'
import chatService from '../../services/chat.service'
import { useEffect } from 'react'

interface Props {
  thisUser: User
  socket: Socket | null
  setChannels: React.Dispatch<React.SetStateAction<ProtoChannel[]>>
  channelsLength: number //Here to update when we remove a channel
}

export default function ChatOpen({
  channelsLength,
  thisUser,
  socket,
  setChannels,
}: Props) {
  // const channels = thisUser.channels
  const params = useParams()
  const channelId = parseInt(params.channelId as string)
  const [channel, setChannel] = useState<Channel>()
  const [editChanOpen, setEditChanOpen] = useState(false)

  useEffect(() => {
    chatService.getChannel(channelId, setChannel)
  }, [channelId, socket, channelsLength])

  useEffect(() => {
    socket?.on('receive_message', (message) => {
      if (message.channelId === channelId) {
        let newChannel = JSON.parse(JSON.stringify(channel))
        newChannel.messages.push(message)
        setChannel(newChannel)
      }
    })
    return () => {
      socket?.off('receive_message')
    }
  })

  if (channel === undefined) {
    return (
      <ContentBox className="w-[400px] sm:max-w-[836px] sm:grow">
        <h1 className="font-semibold text-lg text-center">
          Channel not found..
        </h1>
      </ContentBox>
    )
  }

  return (
    <>
      <PopUpBox open={editChanOpen} setOpen={setEditChanOpen}>
        <EditChannel
          channelId={channelId}
          setChannels={setChannels}
          setOpen={setEditChanOpen}
          // setNewChanOpen={setEditChanOpen}
        />
      </PopUpBox>
      <ContentBox className="w-[400px] sm:max-w-[836px] sm:grow">
        <div className="flex items-center justify-between gap-3 mb-4 px-2">
          <h1 className={'text-[2rem] leading-[2.625rem] font-semibold'}>
            {channelName(channel, thisUser)}
          </h1>
          <EditSvg
            className="w-7 h-7 fill-gray hover:fill-violet duration-300"
            onClick={(e) => setEditChanOpen(true)}
            cursor={'pointer'}
          />
        </div>
        <Conversation
          messages={channel.messages}
          thisUser={thisUser}
          channelId={channel.id}
          socket={socket}
        />
      </ContentBox>
      <ConvInfo channel={channel} thisUser={thisUser}></ConvInfo>
    </>
  )
}
