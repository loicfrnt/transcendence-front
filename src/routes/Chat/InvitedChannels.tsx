import { ProtoChannel } from '../../types/chat'
import { ReactComponent as Accept } from '../../assets/accept.svg'
import { ReactComponent as Reject } from '../../assets/reject.svg'
import { Socket } from 'socket.io-client'
import { useNavigate } from 'react-router-dom'

/* Each Invitation Component */
interface InvitationProps {
  channel: ProtoChannel
  setChannels: React.Dispatch<React.SetStateAction<ProtoChannel[]>>
  setInvitedChannels: React.Dispatch<React.SetStateAction<ProtoChannel[]>>
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  thisUserId: number
  socket: Socket | null
}

const Invitation = ({
  channel,
  socket,
  setInvitedChannels,
  setChannels,
  thisUserId,
  setIsOpen,
}: InvitationProps) => {
  let navigate = useNavigate()

  const acceptInvite = () => {
    socket?.emit('join_channel', { id: channel.id.toString() }, (data: any) => {
      setChannels((channels) => {
        let newChannels = [...channels]
        newChannels.push(data as ProtoChannel)
        return newChannels
      })
      navigate(`/chat/` + data.id)
      setIsOpen(false)
    })
  }

  const rejectInvite = () => {
    socket?.emit(
      'channel_invitation',
      { channelId: channel.id, invitedId: thisUserId },
      (data: any) => {
        console.log(data)
        setInvitedChannels((invitedChannels) => {
          return invitedChannels.filter((chan) => chan.id !== channel.id)
        })
      }
    )
  }

  const svgClass = 'ease-in-out duration-300 fill-gray group-hover:fill-violet'
  return (
    <div className="flex justify-between bg-gray-light rounded-3xl h-24 pl-2 w-full gap-2">
      <div className="flex flex-col justify-center gap-2">
        <h2 className="font-semibold text-lg">{channel.name}</h2>
        <span className="font-semibold text-lg text-gray">
          {channel.status[0].toLocaleUpperCase() + channel.status.slice(1)}
        </span>
      </div>
      <div className="flex flex-col justify-center gap-1.5 h-full pr-3">
        <button className="group" onClick={acceptInvite}>
          <Accept className={svgClass} />
        </button>
        <button className="group" onClick={rejectInvite}>
          <Reject className={svgClass} />
        </button>
      </div>
    </div>
  )
}

/* Main Component */
interface Props {
  invitedChannels: ProtoChannel[]
  setInvitedChannels: React.Dispatch<React.SetStateAction<ProtoChannel[]>>
  setChannels: React.Dispatch<React.SetStateAction<ProtoChannel[]>>
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  thisUserId: number
  socket: Socket | null
}

export default function InvitedChannels({
  invitedChannels,
  setInvitedChannels,
  setChannels,
  setIsOpen,
  thisUserId,
  socket,
}: Props) {
  return (
    <div className="min-w-[200px] duration-75">
      <h1 className="font-semibold text-2xl mb-3">Invitations</h1>
      <div className="overflow-hidden hover:overflow-auto flex flex-col gap-2 pr-0">
        {invitedChannels.map((channel) => {
          return (
            <Invitation
              channel={channel}
              socket={socket}
              setInvitedChannels={setInvitedChannels}
              setChannels={setChannels}
              setIsOpen={setIsOpen}
              thisUserId={thisUserId}
              key={channel.id}
            />
          )
        })}
      </div>
    </div>
  )
}
