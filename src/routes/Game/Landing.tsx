import { Socket } from 'socket.io-client'
import ContentBox from '../../components/ContentBox'
import { Duel } from '../../types/game'
import { User } from '../../types/user'
import GameInvites from './GameInvites'

interface Props {
  setStep: React.Dispatch<React.SetStateAction<string>>
  socket: Socket
  socketChannel: Socket
  duels: Duel[]
  currUser: User
}

export default function Landing({
  setStep,
  socket,
  socketChannel,
  duels,
  currUser,
}: Props) {
  function handleClick() {
    socket.emit('joinQueue', (rep: any) => console.log(rep))
    setStep('queue')
  }

  return (
    <div className="flex items-center justify-evenly h-full w-full">
      <ContentBox button handleClick={(e) => handleClick()}>
        <p className="font-semibold text-[2rem] m-3 ease-in-out duration-300 group-hover:text-white">
          Find match
        </p>
      </ContentBox>
      {duels.length ? (
        <GameInvites
          socket={socket}
          socketChannel={socketChannel}
          duels={duels}
          currUser={currUser}
        />
      ) : null}
    </div>
  )
}
