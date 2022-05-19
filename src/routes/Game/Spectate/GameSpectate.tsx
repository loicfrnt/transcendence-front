import { useEffect, useRef } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { io, Socket } from 'socket.io-client'
import ConnectError from '../../../components/ConnectError'
import MainContainer from '../../../components/MainContainer'
import usersService from '../../../services/users.service'
import Game, { GameStatus } from '../../../types/game'
import NotInGame from './NotInGame'
import SpectateMatch from './SpectateMatch'
import SpectateResults from './SpectateResults'

export default function GameSpectate() {
  const params = useParams()
  const username = params.username!
  const [userId, setUserId] = useState<number | null>(null)
  let navigate = useNavigate()

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

  //Get UserId
  useEffect(() => {
    usersService.getByUsername(username).then(
      (response) => {
        setUserId(response.id)
      },
      (r) => {
        console.log(r)
        navigate('/404')
      }
    )
  }, [username, navigate])

  const [game, setGame] = useState<Game | null>(null)

  useEffect(() => {
    const payload = { id: userId?.toString() }
    socket?.emit('viewGame', payload, (data: any) => console.log(data))
    sockRef.current?.on('update', (game: Game) => {
      setGame(game)
    })
    sockRef.current?.on('endGame', (game: Game) => {
      setGame(game)
    })
    return () => {
      socket?.emit('leaveRoom', payload)
    }
  }, [socket, userId])

  function returnState() {
    if (!socket) {
      return <ConnectError />
    }
    if (!userId) {
      return <p>Couldn't find user</p>
    }
    if (!game) {
      return <NotInGame />
    }
    if (game.status === GameStatus.ENDED) {
      return <SpectateResults game={game} />
    }
    return <SpectateMatch socket={socket} game={game} userId={userId} />
  }
  //Get Spectated Game from UserId
  return <MainContainer>{returnState()}</MainContainer>
}
