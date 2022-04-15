import { User } from '../../types/user'
import { useState } from 'react'
import FindMatch from './FindMatch'
import PlayMatch from './PlayMatch'
import MainContainer from '../../components/MainContainer'

function Game({ currUser }: { currUser: User }) {
  const [match, setMatch] = useState(false)

  return (
    <MainContainer>
      {match ? (
        <PlayMatch currUser={currUser} />
      ) : (
        <FindMatch setMatch={setMatch} />
      )}
    </MainContainer>
  )
}

export default Game
