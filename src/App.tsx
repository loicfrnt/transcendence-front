// React
import { useEffect, useRef, useState } from 'react'

// React Routing
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

// Routes
import { Login } from './routes/Login/Login'
import Navbar from './routes/Navbar/Navbar'
import Home from './routes/Home/Home'
import Game from './routes/Game/Game'
import Chat from './routes/Chat/Chat'
import OtherProfile from './routes/Profile/OtherProfile'
import { Register } from './routes/Register/Register'
import Profile from './routes/Profile/Profile'
import { User } from './types/user'
import authenticationService from './services/authentication.service'
import { io, Socket } from 'socket.io-client'
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
  const socket = useRef<Socket | null>(null)
  useEffect(() => {
    // //WS
    socket.current = io(process.env.REACT_APP_BACK_LINK as string, {
      withCredentials: true,
    })
    return () => {
      socket.current?.close()
    }
  }, [])

  if (!socket.current) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <span className="text-2xl">Couldn't connect to server...</span>
      </div>
    )
  }

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

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="play" element={<Game currUser={currUser} />} />
          <Route
            path="profile/*"
            element={
              <Profile thisUser={currUser} setConnected={setConnected} />
            }
          />
          <Route path=":username" element={<OtherProfile user={currUser} />} />
          <Route path="login" element={<Login setConnected={setConnected} />} />
          <Route
            path="chat/*"
            element={<Chat user={currUser} socket={socket.current} />}
          />
          <Route path="*" element={'404'} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
