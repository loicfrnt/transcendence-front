// React
import { useEffect, useRef, useState } from 'react'

// React Routing
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

// Routes
import { Login } from './routes/Login/Login'
import Navbar from './routes/Navbar/Navbar'
import Home from './routes/Home/Home'
import Chat from './routes/Chat/Chat'
import { Register } from './routes/Register/Register'
import Profile from './routes/Profile/Profile'
import { User } from './types/user'
import authenticationService from './services/authentication.service'
import { io, Socket } from 'socket.io-client'
import ConnectError from './components/ConnectError'
import GameRoutes from './routes/Game/GameRoutes'
export default function App() {
  const [currUser, setCurrUser] = useState<User>(() => {
    return authenticationService.getCurrentUser()
  })
  const savedConnected = localStorage.getItem('connected')
  const [connected, setConnected] = useState(
    // Recover Connected state from cache
    savedConnected ? JSON.parse(savedConnected) : false
  )
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

  if (!connected) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login setConnected={setConnected} />} />
          <Route path="*" element={<Navigate to="/" />}></Route>
          <Route path="register" element={<Register />}></Route>
        </Routes>
      </BrowserRouter>
    )
  }

  if (socket === null) {
    return <ConnectError />
  }

  return (
    <BrowserRouter>
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
            element={<Chat user={currUser} socket={socket} />}
          />
          <Route path="*" element={'404'} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
