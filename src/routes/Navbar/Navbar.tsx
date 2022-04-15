import { Outlet, Link } from 'react-router-dom'
import LogOut from '../../components/LogOut'
import home from './home.svg'
import game from './game.svg'
import profile from './profile.svg'
import chat from './chat.svg'

function Navbar() {
  function renderLinkHome() {
    return (
      <Link to="" className="flex justify-center mb-10">
        <div className="bg-gray-light">
          <img src={home} alt="Home" />
        </div>
      </Link>
    )
  }

  function renderLink(to: string, img: string) {
    return (
      <Link to={to} className="flex justify-center">
        <div className="bg-gray-light">
          <img src={img} alt={to} />
          <p className="text-center">
            {to.charAt(0).toUpperCase() + to.slice(1)}
          </p>
        </div>
      </Link>
    )
  }

  return (
    <div className="flex h-full">
      <nav className="bg-white  space-y-6 flex flex-col w-20 pt-3 ">
        {renderLinkHome()}
        {renderLink('game', game)}
        {renderLink('profile', profile)}
        {renderLink('chat', chat)}
      </nav>
      <Outlet />
    </div>
  )
}

export default Navbar
