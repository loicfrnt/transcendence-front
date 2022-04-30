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
import { ReactComponent as LeaveSvg } from '../../assets/leave.svg'
import chatService from '../../services/chat.service'
import { useEffect } from 'react'
import isOwner from '../../utils/isOwner'

interface Props {
  thisUser: User
  socket: Socket | null
  setChannels: React.Dispatch<React.SetStateAction<ProtoChannel[]>>
  channels: ProtoChannel[] //Here to update when we remove a channel
}

export default function ChatOpen({
  channels,
  thisUser,
  socket,
  setChannels,
}: Props) {
  const params = useParams()
  const channelsLength = channels.length
  const channelId = parseInt(params.channelId as string)
  const [channel, setChannel] = useState<Channel>()
  const [editChanOpen, setEditChanOpen] = useState(false)

  useEffect(() => {
    if (channels.find((chan) => chan.id === channelId) === undefined) {
      setChannel(undefined)
    } else {
      chatService.getChannel(channelId, setChannel)
    }
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

  // in a function, rendered conditionnaly
  function EditPopUp() {
    if (channel !== undefined && isOwner(thisUser, channel)) {
      return (
        <PopUpBox open={editChanOpen} setOpen={setEditChanOpen}>
          <EditChannel
            channelId={channelId}
            setChannels={setChannels}
            setOpen={setEditChanOpen}
            // setNewChanOpen={setEditChanOpen}
          />
        </PopUpBox>
      )
    }
  }

  // in a function, rendered conditionnaly
  function SvgButtons() {
    // Redundant Styles
    const svgClass = 'w-7 h-7 fill-gray hover:fill-violet duration-300'
    if (channel && channel.status !== 'direct-message')
      return (
        <div className="flex justify-end gap-5">
          {isOwner(thisUser, channel) ? (
            <EditSvg
              className={svgClass}
              onClick={(e) => setEditChanOpen(true)}
              cursor={'pointer'}
            />
          ) : (
            <></>
          )}
          <LeaveSvg
            className={svgClass}
            onClick={(e) =>
              socket?.emit(
                'leave_channel',
                { id: channelId.toString() },
                () => {
                  chatService.getChannels(setChannels)
                }
              )
            }
            cursor={'pointer'}
          />
        </div>
      )
  }

  return (
    <>
      {EditPopUp()}
      <ContentBox className="w-[400px] sm:max-w-[836px] sm:grow">
        <div className="flex items-center justify-between gap-3 mb-4 px-2 flex-wrap">
          <h1 className={'text-[2rem] leading-[2.625rem] font-semibold'}>
            {channelName(channel, thisUser)}
          </h1>
          {SvgButtons()}
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
