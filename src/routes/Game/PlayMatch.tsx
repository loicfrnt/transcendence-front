import { User } from '../../types/user'
import PongGame from './PongGame'
import UserDesc from '../../components/UserDesc'

export default function PlayMatch({ currUser }: { currUser: User }) {
  const instructions =
    'Use the arrow keys to move. Score 10 points to win the game'
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
