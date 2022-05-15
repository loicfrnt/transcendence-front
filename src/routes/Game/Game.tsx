import { User } from '../../types/user'
import { useState } from 'react'
import MainContainer from '../../components/MainContainer'
import FindMatch from './FindMatch'
import PlayMatch from './PlayMatch'
import SetupMatch from './SetupMatch'
import InQueue from './InQueue'
import { Socket } from 'socket.io-client'

interface Props {
  currUser: User
  // socket: Socket
}

function Game({ currUser }: Props) {
  const [step, setStep] = useState('idle')

  function returnState() {
    switch (step) {
      case 'match':
        return <PlayMatch currUser={currUser} />
      case 'setup':
        return <SetupMatch setStep={setStep} />
      case 'queue':
        return <InQueue setStep={setStep} />
      default:
      case 'idle':
        return <FindMatch setStep={setStep} />
    }
  }

  return <MainContainer>{returnState()}</MainContainer>
}

export default Game
