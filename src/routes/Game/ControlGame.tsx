import { useRef } from 'react'
import { MouseEvent } from 'react'
import { TouchEvent } from 'react'
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
    const hRatio = 460 / canvas.current?.getBoundingClientRect().height!
    socket.emit('mousemove', {
      id: game.id,
      canvasLocationY: canvas.current?.getBoundingClientRect().y! * hRatio,
      clientY: event.clientY * hRatio,
    })
  }

  function sendTouch(event: TouchEvent) {
    // if (game && game.status === 'running')
    console.log(event)
    const hRatio = 460 / canvas.current?.getBoundingClientRect().height!
    socket.emit('mousemove', {
      id: game.id,
      canvasLocationY: canvas.current?.getBoundingClientRect().y! * hRatio,
      clientY: event.touches[0].clientY * hRatio,
    })
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <span className="font-semibold text-[2rem]">
        {game.player1.score} - {game.player2.score}
      </span>
      <canvas
        onMouseMove={sendMouse}
        onTouchMove={sendTouch}
        ref={canvas}
        id="pongCanvas"
        className="rounded-2xl max-w-[80vw] touch-none"
        width="640"
        height="480"
      />
    </div>
  )
}
