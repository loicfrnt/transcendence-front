// React
import { useEffect, useRef, useState } from 'react'
// React Routing
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { io, Socket } from 'socket.io-client'
import Cookies from 'universal-cookie'
import ConnectError from './components/ConnectError'
import NotFoundErr from './components/NotFoundError'
import Chat from './routes/Chat/Chat'
import GameRoutes from './routes/Game/GameRoutes'
import Home from './routes/Home/Home'
// Routes
import { Login } from './routes/Login/Login'
import Navbar from './routes/Navbar/Navbar'
import Profile from './routes/Profile/Profile'
import { Register } from './routes/Register/Register'
import achievementsService from './services/achievements.service'
import authenticationService from './services/authentication.service'
import usersService from './services/users.service'
import { User } from './types/user'

export default function App() {
  const [currUser, setCurrUser] = useState<User>(
    authenticationService.getCurrentUser()
  )
  const savedConnected = localStorage.getItem('connected')
  const [connected, setConnected] = useState(
    // Recover Connected state from cache
    savedConnected ? JSON.parse(savedConnected) : false
  )
  const cookies = new Cookies()
  const ft_connected = cookies.get('ft_logged')
  const ft_user = cookies.get('user')
  const navigate = useNavigate()
  useEffect(() => {
    if (ft_connected) {
      usersService.getCurrent().then((user) => {
        setCurrUser(user)
      })
      setConnected(true)
    } else if (ft_user) navigate('/register')
    achievementsService.load()
  }, [])
  // Cache connected state
  useEffect(() => {
    localStorage.setItem('connected', JSON.stringify(connected))
    const currentUser = authenticationService.getCurrentUser()
    setCurrUser(currentUser)
  }, [connected])

  // WebSocket management
  const [socket, setSocket] = useState<Socket | null>(null)
  const sockRef = useRef<Socket | null>(null)
  useEffect(() => {
    if (connected) {
      sockRef.current = io(process.env.REACT_APP_BACK_LINK as string, {
        withCredentials: true,
      })
      setSocket(sockRef.current)
      return () => {
        sockRef.current?.close()
      }
    }
  }, [connected])

  function Ftlogin() {
    window.location.href = '/api/authentication/log-in'
    return null
  }

  if (!connected) {
    return (
      <Routes>
        <Route path="/" element={<Login setConnected={setConnected} />} />
        <Route path="*" element={<Navigate to="/" />}></Route>
        <Route path="register" element={<Register />}></Route>
        <Route path="ft_login" element={<Ftlogin />} />
      </Routes>
    )
  }

  if (socket === null) {
    return <ConnectError />
  }

  return (
    <Routes>
      <Route path="/" element={<Navbar socket={socket} />}>
        <Route index element={<Home />} />
        <Route
          path="game/*"
          element={<GameRoutes currUser={currUser} socketChannel={socket} />}
        />
        <Route
          path="profile/*"
          element={
            <Profile
              currUser={currUser}
              setCurrUser={setCurrUser}
              setConnected={setConnected}
              socket={socket}
            />
          }
        />
        <Route path="login" element={<Login setConnected={setConnected} />} />
        <Route
          path="chat/*"
          element={
            <Chat user={currUser} setCurrUser={setCurrUser} socket={socket} />
          }
        />
        <Route path="*" element={<NotFoundErr />} />
      </Route>
    </Routes>
  )
}
