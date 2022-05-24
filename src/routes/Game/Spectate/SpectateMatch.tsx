import { useEffect, useRef } from 'react'
import { draw } from '../../../pong/pong'
import Game, { GameStatus } from '../../../types/game'
import PlayerLeft from '../PlayerLeft'
import UserDesc from '../UserDesc'

interface Props {
  game: Game
  userId: number
}

export default function SpectateMatch({ game, userId }: Props) {
  const canvas = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    draw(canvas.current as HTMLCanvasElement, game)
  }, [game])

  return (
    <div
      className={`flex flex-wrap items-center justify-evenly h-full w-full gap-5}`}
    >
      {game.status === GameStatus.STOPPED && <PlayerLeft role="Oppenent" />}
      <UserDesc
        user={game.player1.user}
        role={game.player1.user.id === userId ? 'Spectating' : 'Oppenent'}
      />
      <div className="flex flex-col items-center gap-3">
        <span className="font-semibold text-[2rem]">
          {game.player1.score} - {game.player2.score}
        </span>
        <canvas
          ref={canvas}
          id="pongCanvas"
          className="rounded-2xl max-w-[80vw]"
          width="640"
          height="480"
        />
      </div>
      <UserDesc
        user={game.player2.user}
        role={game.player1.user.id === userId ? 'Spectating' : 'Oppenent'}
      />
    </div>
  )
}
