import { User } from '../../types/user'
import UserDesc from './UserDesc'
import ContentBox from '../../components/ContentBox'
import { Socket } from 'socket.io-client'
import Game, { GameStatus } from '../../types/game'
import ControlGame from './ControlGame'
import PlayerLeft from './PlayerLeft'

interface Props {
  currUser: User
  socket: Socket
  game: Game
}

export default function PlayMatch({ currUser, socket, game }: Props) {
  const oppenent =
    game.player1.user.id === currUser.id ? game.player2 : game.player1
  const instructions = `Use the mouse to move. Score ${game.maxPoints} points to win the game`
  const order = oppenent === game.player1 ? 'flex-row-reverse' : ''

  return (
    <div
      className={`flex flex-wrap items-center justify-evenly h-full w-full gap-5 ${order}`}
    >
      {game.status === GameStatus.STOPPED && <PlayerLeft role="Oppenent" />}
      <ContentBox className="max-w-[255px] pt-[6px]">
        <h2 className="font-body font-semibold text-[2rem] leading-[2.625rem]">
          How to play
        </h2>
        <p className="mt-3 text-[1.375rem] leading-[1.813rem]">
          {instructions}
        </p>
      </ContentBox>
      <ControlGame socket={socket} game={game} />
      <UserDesc user={oppenent.user} role="Oppenent" />
    </div>
  )
}
