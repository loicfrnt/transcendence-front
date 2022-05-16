import { useEffect, useRef } from 'react'
import { Socket } from 'socket.io-client'
import { draw } from '../../../pong/pong'
import Game from '../../../types/game'
import UserDesc from '../UserDesc'

interface Props {
  socket: Socket
  game: Game
  userId: number
}

export default function SpectateMatch({ socket, game, userId }: Props) {
  const canvas = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    draw(canvas.current as HTMLCanvasElement, game)
  }, [game])

  return (
    <div
      className={`flex flex-wrap items-center justify-evenly h-full w-full gap-5}`}
    >
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
          className="rounded-2xl"
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
