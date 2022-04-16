import { Outlet, NavLink } from 'react-router-dom'
import { ReactComponent as Home } from './home.svg'
import { ReactComponent as Game } from './game.svg'
import { ReactComponent as Profile } from './profile.svg'
import { ReactComponent as Chat } from './chat.svg'

function Navbar() {
  function renderLink(
    to: string,
    Svg: React.FunctionComponent<
      React.SVGProps<SVGSVGElement> & {
        title?: string | undefined
      }
    >
  ) {
    return (
      <NavLink
        to={to}
        className={'flex justify-center' + (Svg === Home ? ' mb-10' : '')}
      >
        {({ isActive }) => {
          return (
            <div
              className={
                'ease-in-out duration-300 group h-[77px] w-[77px] rounded-lg py-[4px] hover:bg-gray-light' +
                (isActive ? ' bg-gray-light' : '')
              }
            >
              <div className="flex justify-center">
                <Svg
                  className={
                    'ease-in-out duration-300 ' +
                    (isActive
                      ? 'fill-violet'
                      : 'fill-gray group-hover:fill-violet')
                  }
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
        {renderLink('', Home)}
        {renderLink('game', Game)}
        {renderLink('profile', Profile)}
        {renderLink('chat', Chat)}
      </nav>
      <Outlet />
    </div>
  )
}

export default Navbar
