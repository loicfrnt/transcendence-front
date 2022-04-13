import { User } from '../../types/user'
import { useState } from 'react'
import FindMatch from './FindMatch'
import PlayMatch from './PlayMatch'

function Game({ currUser }: { currUser: User }) {
  const [match, setMatch] = useState(false)

  return match ? (
    <PlayMatch currUser={currUser} />
  ) : (
    <FindMatch setMatch={setMatch} />
  )
}

export default Game
