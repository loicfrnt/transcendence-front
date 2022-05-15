import { User } from '../../types/user'
import PongGame from './PongGame'
import UserDesc from './UserDesc'
import ContentBox from '../../components/ContentBox'
import { Socket } from 'socket.io-client'

interface Props {
  currUser: User
  socket: Socket
}

export default function PlayMatch({ currUser, socket }: Props) {
  const instructions =
    'Use the arrow keys to move. Score 10 points to win the game'
  return (
    <div className="flex flex-wrap items-center justify-evenly h-full w-full gap-5">
      <ContentBox className="max-w-[255px] pt-[6px]">
        <h2 className="font-body font-semibold text-[2rem] leading-[2.625rem]">
          How to play
        </h2>
        <p className="mt-3 text-[1.375rem] leading-[1.813rem]">
          {instructions}
        </p>
      </ContentBox>
      <PongGame />
      <UserDesc user={currUser} role="Oppenent" />
    </div>
  )
}
