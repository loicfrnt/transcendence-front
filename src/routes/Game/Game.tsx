import { User } from '../../types/user'
import { useEffect, useState } from 'react'
import MainContainer from '../../components/MainContainer'
import FindMatch from './FindMatch'
import PlayMatch from './PlayMatch'
import SetupMatch from './SetupMatch'
import InQueue from './InQueue'
import { io, Socket } from 'socket.io-client'
import ConnectError from '../../components/ConnectError'

interface Props {
  currUser: User
}

function Game({ currUser }: Props) {
  const [step, setStep] = useState('idle')
  //WS
  const [socket, setSocket] = useState<Socket | null>(null)
  useEffect(() => {
    setSocket(
      io((process.env.REACT_APP_BACK_LINK as string) + 'pong', {
        withCredentials: true,
      })
    )
    return () => {
      socket?.close()
    }
  }, [])

  function returnState() {
    if (socket === null) {
      return <ConnectError />
    }
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
