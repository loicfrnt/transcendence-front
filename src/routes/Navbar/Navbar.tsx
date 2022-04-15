import { Outlet, Link } from 'react-router-dom'
import LogOut from '../../components/LogOut'
import home from './home.svg'
import game from './game.svg'
import profile from './profile.svg'
import chat from './chat.svg'

function Navbar() {
  function renderLink(to: string, img: string) {
    return (
      <Link to={to} className="flex-basis-16 justify-center">
        <div>
          <img src={img} alt={to} />
        </div>
      </Link>
    )
  }

  return (
    <div>
      <nav className="bg-white fixed space-y-6 flex flex-col w-20 h-screen">
        {renderLink('', home)}
        {renderLink('game', game)}
        {renderLink('profile', profile)}
        {renderLink('chat', chat)}
      </nav>
      <Outlet />
    </div>
  )
}

export default Navbar
