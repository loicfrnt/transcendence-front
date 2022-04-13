import { User } from '../../types/user'
import { UserDesc } from '../../components/UserDesc'
import PongGame from '../../components/PongGame'

function Game({ currUser }: { currUser: User }) {
  const instructions =
    'Use the arrow keys to move. Score 10 points to win the game'

  // useEffect(() => () => {
  //   document.removeEventListener('keydown', (e) => game.playerMoveKB(e))
  // }, [])

  return (
    <div>
      <div>
        <h2>How to play</h2>
        <p>{instructions}</p>
      </div>
      <PongGame />
      <div className="oppenent">
        <div>Oppenent</div>
        <UserDesc user={currUser} />
      </div>
    </div>
  )
}

export default Game
