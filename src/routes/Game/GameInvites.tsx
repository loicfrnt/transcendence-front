import { Socket } from 'socket.io-client'
import ContentBox from '../../components/ContentBox'
import { ReactComponent as Accept } from '../../assets/accept.svg'
import { ReactComponent as Reject } from '../../assets/reject.svg'
import { Duel } from '../../types/game'
import { User } from '../../types/user'

/* Each Invitation Component */
interface InvitationProps {
  duel: Duel
  inviteUser: User
  socket: Socket
}

const Invitation = ({ duel, socket, inviteUser }: InvitationProps) => {
  const acceptInvite = () => {
    socket.emit('joinWaitingRoom', { id: duel.id.toString() }, (resp: any) =>
      console.log(resp)
    )
  }

  const rejectInvite = () => {
    socket.emit(
      'deleteDuelInvitation',
      { id: duel.id.toString() },
      (resp: any) => console.log(resp)
    )
  }

  const svgClass = 'ease-in-out duration-300 fill-gray group-hover:fill-violet'
  return (
    <div className="flex justify-between bg-gray-light rounded-3xl h-24 pl-2 w-full gap-2">
      <div className="flex flex-col justify-center gap-2">
        <h2 className="font-semibold text-lg">{inviteUser.username}</h2>
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

interface Props {
  socket: Socket
  duels: Duel[]
  currUser: User
}

export default function GameInvites({ socket, duels, currUser }: Props) {
  return (
    <ContentBox className="min-w-[200px] duration-75">
      <h1 className="font-semibold text-2xl mb-3">Invitations</h1>
      <div className="overflow-hidden hover:overflow-auto flex flex-col gap-2 pr-0">
        {duels.map((duel) => {
          const inviteUser =
            duel.receiver.id === currUser.id ? duel.sender : duel.receiver
          return (
            <Invitation
              socket={socket}
              duel={duel}
              inviteUser={inviteUser}
              key={duel.id}
            />
          )
        })}
      </div>
    </ContentBox>
  )
}
