import { Outlet, Link, NavLink } from 'react-router-dom'
import home from './home.svg'
import game from './game.svg'
import gameActive from './gameActive.svg'
import profile from './profile.svg'
import profileActive from './profileActive.svg'
import chat from './chat.svg'
import chatActive from './chatActive.svg'

function Navbar() {
  function renderLinkHome() {
    return (
      <NavLink to="" className="flex justify-center mb-10">
        <div className="bg-gray-light h-[77px] w-[77px] rounded py-[4px]">
          <div className="flex justify-center">
            <img src={home} alt="Home" />
          </div>
        </div>
      </NavLink>
    )
  }

  function renderLink(to: string, svg: string, svgActive: string) {
    return (
      <NavLink
        to={to}
        className={'flex justify-center' + (svg === home ? ' mb-10' : '')}
      >
        {({ isActive }) => {
          return (
            <div
              className={
                'h-[77px] w-[77px] rounded-lg py-[4px] hover:bg-gray-light' +
                (isActive ? ' bg-gray-light' : '')
              }
            >
              <div className="flex justify-center">
                <img
                  src={isActive ? svgActive : svg}
                  alt={to}
                  className="hover:fill-violet"
                />
              </div>
              <p className="text-center">
                {to.charAt(0).toUpperCase() + to.slice(1)}
              </p>
            </div>
          )
        }}
      </NavLink>
    )
  }

  return (
    <div className="flex h-full">
      <nav className="bg-white  space-y-6 flex flex-col w-[89px] px-[5px] pt-3 ">
        {/* {renderLinkHome()} */}
        {renderLink('', home, home)}
        {renderLink('game', game, gameActive)}
        {renderLink('profile', profile, profileActive)}
        {renderLink('chat', chat, chatActive)}
      </nav>
      <Outlet />
    </div>
  )
}

export default Navbar
