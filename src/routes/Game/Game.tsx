import { User } from '../../types/user'
import { UserDesc } from '../../components/UserDesc'
import PongGame from '../../components/PongGame'
import { useState } from 'react'
import FindMatch from '../../components/FindMatch'

function Game({ currUser }: { currUser: User }) {
  const instructions =
    'Use the arrow keys to move. Score 10 points to win the game'
  const [match, setMatch] = useState(false)

  return (
    <div>
      <div>
        <h2>How to play</h2>
        <p>{instructions}</p>
      </div>
      {match ? <PongGame /> : <FindMatch setMatch={setMatch} />}
      <div className="oppenent">
        <div>Oppenent</div>
        <UserDesc user={currUser} />
      </div>
    </div>
  )
}

export default Game
