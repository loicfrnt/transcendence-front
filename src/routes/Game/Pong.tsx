import { User } from '../../types/user'
import { useEffect, useRef, useState } from 'react'
import MainContainer from '../../components/MainContainer'
import Landing from './Landing'
import PlayMatch from './PlayMatch'
import SetupMatch from './SetupMatch'
import InQueue from './InQueue'
import { io, Socket } from 'socket.io-client'
import ConnectError from '../../components/ConnectError'
import Game, { Duel, GameStatus } from '../../types/game'
import Results from './Results'
import WaitingFor from './WaitingFor'

interface Props {
  currUser: User
  socketChannel: Socket
}

export default function Pong({ currUser, socketChannel }: Props) {
  const [step, setStep] = useState('idle')
  const [game, setGame] = useState<Game | null>(null)
  const [duels, setDuels] = useState<Duel[]>([])
  //WS
  const [socket, setSocket] = useState<Socket | null>(null)
  const sockRef = useRef<Socket | null>(null)
  useEffect(() => {
    sockRef.current = io('http://localhost:3000/pong', {
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
    sockRef.current?.on('duels-update', (duels: Duel[]) => {
      setDuels(duels)
    })

    return () => {
      sockRef.current?.off('update')
      sockRef.current?.off('duels-update')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sockRef.current])

  useEffect(() => {
    const pushDuel = (duel: Duel) => {
      setDuels((duels) => {
        let newDuels = [...duels]
        if (newDuels.find((curr) => curr.id === duel.id) === undefined) {
          newDuels.push(duel)
        }
        return newDuels
      })
    }
    socketChannel.on('newDuelInvitation', pushDuel)

    socketChannel.on('deletedDuelInvitation', (duel: Duel) => {
      console.log(duel)
      setDuels((duels) => duels.filter((curr) => curr.id !== duel.id))
    })

    return () => {
      socketChannel.off('newDuelInvitation', pushDuel)
      socketChannel.off('deletedDuelInvitation')
    }
  }, [socketChannel])

  function returnState() {
    if (!socket) {
      return <ConnectError />
    }
    if (!game) {
      if (step === 'idle') {
        return (
          <Landing
            setStep={setStep}
            socket={socket}
            socketChannel={socketChannel}
            duels={duels}
            currUser={currUser}
          />
        )
      } else {
        return <InQueue setGame={setGame} socket={socket} />
      }
    }
    if (game?.status === GameStatus.WAITING) {
      return <WaitingFor message="Waiting for oppenent to join the room" />
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
      return <PlayMatch currUser={currUser} socket={socket} game={game} />
    }
  }

  return <MainContainer>{returnState()}</MainContainer>
}
