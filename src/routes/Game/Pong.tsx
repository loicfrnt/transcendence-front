import { User } from '../../types/user'
import { useEffect, useRef, useState } from 'react'
import MainContainer from '../../components/MainContainer'
import FindMatch from './FindMatch'
import PlayMatch from './PlayMatch'
import SetupMatch from './SetupMatch'
import InQueue from './InQueue'
import { io, Socket } from 'socket.io-client'
import ConnectError from '../../components/ConnectError'
import Game from '../../types/game'

interface Props {
  currUser: User
}

export default function Pong({ currUser }: Props) {
  const [step, setStep] = useState('idle')
  const [game, setGame] = useState<Game | null>(null)
  //WS
  const [socket, setSocket] = useState<Socket | null>(null)
  const sockRef = useRef<Socket | null>(null)
  useEffect(() => {
    sockRef.current = io((process.env.REACT_APP_BACK_LINK as string) + 'pong', {
      withCredentials: true,
    })
    setSocket(sockRef.current)
    return () => {
      sockRef.current?.close()
    }
  }, [])

  function returnState() {
    if (socket === null) {
      return <ConnectError />
    }
    switch (step) {
      case 'match':
        if (game)
          return (
            <PlayMatch
              currUser={currUser}
              socket={socket}
              game={game}
              setGame={setGame}
            />
          )
        return <ConnectError />
      case 'setup':
        if (game)
          return (
            <SetupMatch
              setStep={setStep}
              socket={socket}
              game={game}
              setGame={setGame}
              currUser={currUser}
            />
          )
        return <ConnectError />
      case 'queue':
        return <InQueue setStep={setStep} setGame={setGame} socket={socket} />
      default:
      case 'idle':
        return <FindMatch setStep={setStep} socket={socket} />
    }
  }

  return <MainContainer>{returnState()}</MainContainer>
}
