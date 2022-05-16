import { useRef } from 'react'
import { MouseEvent } from 'react'
import { useEffect } from 'react'
import { Socket } from 'socket.io-client'
import Game from '../../types/game'

function draw(canvas: HTMLCanvasElement, game: Game) {
  var context = canvas.getContext('2d')
  if (!context) return

  //Draw field
  context.fillStyle = 'black'
  context.fillRect(0, 0, canvas.width, canvas.height)

  //Draw middle line

  context.strokeStyle = 'white'
  context.beginPath()
  context.moveTo(canvas.width / 2, 0)
  context.lineTo(canvas.width / 2, canvas.height)
  context.stroke()

  //Draw players

  context.fillStyle = 'white'
  context.fillRect(
    0,
    game.player1.y as number,
    game.playerWidth,
    game.playerHeight
  )
  context.fillRect(
    canvas.width - game.playerWidth,
    game.player2.y as number,
    game.playerWidth,
    game.playerHeight
  )

  //Draw Ball
  context.beginPath()
  context.fillStyle = 'white'
  context.arc(game.ball.x, game.ball.y, game.ball.r, 0, Math.PI * 2, false)
  context.fill()
}

interface Props {
  socket: Socket
  game: Game
  setGame: React.Dispatch<React.SetStateAction<Game | null>>
}

export default function PongGame({ socket, game, setGame }: Props) {
  const canvas = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    socket.on('update', (game: Game) => {
      setGame(game)
      draw(canvas.current as HTMLCanvasElement, game)
    })
    return () => {
      socket.off('update')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket])

  function sendMouse(event: MouseEvent) {
    // if (game && game.status === 'running')
    socket.emit(
      'mousemove',
      {
        id: game.id,
        canvasLocationY: canvas.current?.getBoundingClientRect().y,
        clientY: event.clientY,
      },
      (rep: any) => console.log(rep)
    )
  }

  return (
    <canvas
      onMouseMove={sendMouse}
      ref={canvas}
      id="pongCanvas"
      className="rounded-2xl"
      width="640"
      height="480"
    ></canvas>
  )
}
