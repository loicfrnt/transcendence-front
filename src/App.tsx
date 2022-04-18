// React
import { useEffect, useState } from 'react'

// React Routing
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom'

// Routes
import { Login } from './routes/Login/Login'
import Navbar from './routes/Navbar/Navbar'
import Home from './routes/Home/Home'
import Game from './routes/Game/Game'
import Chat from './routes/Chat/Chat'
//tmp
import { thisUser } from './data/users'
import UserProfile from './routes/Profile/MyProfile'
import OtherProfile from './routes/Profile/OtherProfile'

function App() {
  const [currUser, setCurrUser] = useState(thisUser)
  const savedConnected = localStorage.getItem('cart')
  const [connected, setConnected] = useState(
    // Recover Connected state from cache
    savedConnected ? JSON.parse(savedConnected) : false
  )

  // Cache connected state
  useEffect(() => {
    localStorage.setItem('connected', JSON.stringify(connected))
  }, [connected])

  if (!connected) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login setConnected={setConnected} />} />
          <Route path="*" element={<Navigate to="/" />}></Route>
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
          <Route path="profile" element={<Outlet />}>
            <Route
              index
              element={
                <UserProfile user={currUser} setConnected={setConnected} />
              }
            />
            <Route path=":username" element={<OtherProfile />} />
          </Route>
          <Route path="chat" element={<Chat />} />
          <Route path="*" element={'404'} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
