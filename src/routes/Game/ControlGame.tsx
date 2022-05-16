import { useRef } from 'react'
import { MouseEvent } from 'react'
import { useEffect } from 'react'
import { Socket } from 'socket.io-client'
import { draw } from '../../pong/pong'
import Game from '../../types/game'

interface Props {
  socket: Socket
  game: Game
}

export default function ControlGame({ socket, game }: Props) {
  const canvas = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    draw(canvas.current as HTMLCanvasElement, game)
  }, [game])

  function sendMouse(event: MouseEvent) {
    // if (game && game.status === 'running')
    socket.emit('mousemove', {
      id: game.id,
      canvasLocationY: canvas.current?.getBoundingClientRect().y,
      clientY: event.clientY,
    })
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <span className="font-semibold text-[2rem]">
        {game.player1.score} - {game.player2.score}
      </span>
      <canvas
        onMouseMove={sendMouse}
        ref={canvas}
        id="pongCanvas"
        className="rounded-2xl"
        width="640"
        height="480"
      />
    </div>
  )
}
