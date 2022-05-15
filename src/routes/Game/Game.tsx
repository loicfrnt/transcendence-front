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
  socket: Socket
}

function Game({ currUser, socket }: Props) {
  const [step, setStep] = useState('idle')

  function returnState() {
    switch (step) {
      case 'match':
        return <PlayMatch currUser={currUser} socket={socket} />
      case 'setup':
        return <SetupMatch setStep={setStep} socket={socket} />
      case 'queue':
        return <InQueue setStep={setStep} socket={socket} />
      default:
      case 'idle':
        return <FindMatch setStep={setStep} socket={socket} />
    }
  }

  return <MainContainer>{returnState()}</MainContainer>
}

export default Game
