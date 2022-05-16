import { RelStatus, User } from '../../types/user'
import { useEffect, useRef, useState } from 'react'
import MainContainer from '../../components/MainContainer'
import FindMatch from './FindMatch'
import PlayMatch from './PlayMatch'
import SetupMatch from './SetupMatch'
import InQueue from './InQueue'
import { io, Socket } from 'socket.io-client'
import ConnectError from '../../components/ConnectError'
import Game, { GameStatus } from '../../types/game'
import Results from './Results'

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

  useEffect(() => {
    sockRef.current?.on('update', (game: Game) => {
      setGame(game)
    })
    sockRef.current?.on('endGame', (game: Game) => {
      setGame(game)
    })
    return () => {
      sockRef.current?.off('update')
      sockRef.current?.off('endGame')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sockRef.current])

  function returnState() {
    if (!socket) {
      return <ConnectError />
    }
    if (!game) {
      if (step === 'idle')
        return <FindMatch setStep={setStep} socket={socket} />
      else
        return <InQueue setStep={setStep} setGame={setGame} socket={socket} />
    }

    if (game?.status === GameStatus.INITIALIZATION) {
      return (
        <SetupMatch
          setStep={setStep}
          socket={socket}
          game={game}
          setGame={setGame}
          currUser={currUser}
        />
      )
    }
    if (game?.status === GameStatus.ENDED) {
      return (
        <Results
          currUser={currUser}
          socket={socket}
          game={game}
          setGame={setGame}
          setStep={setStep}
        />
      )
    } else {
      return (
        <PlayMatch
          currUser={currUser}
          socket={socket}
          game={game}
          setGame={setGame}
        />
      )
    }
  }

  return <MainContainer>{returnState()}</MainContainer>
}
