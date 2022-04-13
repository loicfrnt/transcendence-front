import { User } from '../../types/user'
import { UserDesc } from '../../components/UserDesc'
import { GameCanvas } from '../../pong/pong'
import { useEffect } from 'react'

function Game({ currUser }: { currUser: User }) {
  const instructions =
    'Use the arrow keys to move. Score 10 points to win the game'

  useEffect(() => {
    console.log('game loaded')
    let canvas = document.querySelector(
      'canvas#pongCanvas'
    ) as HTMLCanvasElement
    let game = new GameCanvas(canvas)

    document.addEventListener('keydown', (e) => game.playerMoveKB(e))
    game.draw()
    game.play()
  }, [])

  // useEffect(() => () => {
  //   document.removeEventListener('keydown', (e) => game.playerMoveKB(e))
  // }, [])

  return (
    <div>
      <div>
        <h2>How to play</h2>
        <p>{instructions}</p>
      </div>
      {/* TMP */}
      <p>
        Joueur 1 : <em id="player-score">0</em> - Joueur 2 :
        <em id="oppenent-score">0</em>
      </p>
      {/* TMP */}
      <canvas id="pongCanvas" width="640" height="480"></canvas>
      <div className="oppenent">
        <div>Oppenent</div>
        <UserDesc user={currUser} />
      </div>
    </div>
  )
}

export default Game
