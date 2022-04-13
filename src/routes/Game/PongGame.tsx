import { useEffect } from 'react'
import { GameCanvas } from '../../pong/pong'

export default function PongGame() {
  useEffect(() => {
    console.log('game loaded')
    let canvas = document.querySelector(
      'canvas#pongCanvas'
    ) as HTMLCanvasElement
    let game = new GameCanvas(canvas)
    function listener(e: KeyboardEvent) {
      game.playerMoveKB(e)
    }

    document.addEventListener('keydown', listener)
    game.draw()
    game.play()
    return () => {
      game.run = false
      document.removeEventListener('keydown', listener)
      console.log('game unloaded')
    }
  }, [])
  return <canvas id="pongCanvas" width="640" height="480"></canvas>
}
