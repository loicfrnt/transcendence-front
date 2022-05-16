import { User } from '../../types/user'
import PongGame from './PongGame'
import UserDesc from './UserDesc'
import ContentBox from '../../components/ContentBox'
import { Socket } from 'socket.io-client'
import Game from '../../types/game'

interface Props {
  currUser: User
  socket: Socket
  game: Game
  setGame: React.Dispatch<React.SetStateAction<Game | null>>
}

export default function PlayMatch({ currUser, socket, game, setGame }: Props) {
  const oppenent =
    game.player1.user.id === currUser.id ? game.player2 : game.player1
  const instructions = `Use the mouse to move. Score ${game.maxPoints} points to win the game`
  const order = oppenent === game.player1 ? 'flex-row-reverse' : ''
  return (
    <div
      className={`flex flex-wrap items-center justify-evenly h-full w-full gap-5 ${order}`}
    >
      <ContentBox className="max-w-[255px] pt-[6px]">
        <h2 className="font-body font-semibold text-[2rem] leading-[2.625rem]">
          How to play
        </h2>
        <p className="mt-3 text-[1.375rem] leading-[1.813rem]">
          {instructions}
        </p>
      </ContentBox>
      <PongGame socket={socket} game={game} setGame={setGame} />
      <UserDesc user={oppenent.user} role="Oppenent" />
    </div>
  )
}
