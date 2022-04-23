// React
import { useEffect, useState } from 'react'

// React Routing
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

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
import { Register } from './routes/Register/Register'
import Profile from './routes/Profile/Profile'
import { dummyChannel, dummyDm, myChannel } from './data/channels'

export default function App() {
  //TMP
  thisUser.channels = [dummyDm, dummyChannel, myChannel]

  const [currUser, setCurrUser] = useState(thisUser)
  const savedConnected = localStorage.getItem('connected')
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
          <Route path=":username" element={<OtherProfile />} />
          <Route path='login' element = {<Login setConnected={setConnected}/>}/>
          <Route path="chat/*" element={<Chat user={thisUser} />} />
          <Route path="*" element={'404'} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
