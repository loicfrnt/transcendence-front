import { Outlet, Link } from 'react-router-dom'

function Navbar() {
  return (
    <div>
      <nav>
        <Link to="">Home </Link>
        <Link to="/game">Game </Link>
        <Link to="/profile">Profile </Link>
        <Link to="/chat">Chat </Link>
      </nav>
      <Outlet />
    </div>
  )
}

export default Navbar
