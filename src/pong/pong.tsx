import Game from '../types/game'

export function draw(canvas: HTMLCanvasElement, game: Game) {
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
