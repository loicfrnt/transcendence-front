import { Outlet, NavLink } from 'react-router-dom'
import { ReactComponent as Home } from '../../assets/home.svg'
import { ReactComponent as Game } from '../../assets/game.svg'
import { ReactComponent as Profile } from '../../assets/profile.svg'
import { ReactComponent as Chat } from '../../assets/chat.svg'

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
        className={'flex justify-center' + (Svg === Home ? ' mb-3' : '')}
      >
        {({ isActive }) => {
          return (
            <div
              className={
                'ease-in-out duration-300 group h-[76px] w-[76px] rounded-xl hover:bg-gray-light flex flex-col justify-between' +
                (isActive ? ' bg-gray-light' : '') +
                (Svg !== Home ? ' py-[10px]' : ' pt-[7px]')
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
              <p
                className={
                  'text-center ease-in-out duration-300 ' +
                  (isActive
                    ? 'text-violet'
                    : 'text-gray group-hover:text-violet')
                }
              >
                {to.charAt(0).toUpperCase() + to.slice(1)}
              </p>
            </div>
          )
        }}
      </NavLink>
    )
  }

  return (
    <div className="flex h-full font-body text-sm">
      <nav className="bg-white  space-y-6 flex flex-col w-[88px] px-[5px] pt-3 ">
        {renderLink('', Home)}
        {renderLink('play', Game)}
        {renderLink('profile', Profile)}
        {renderLink('chat', Chat)}
      </nav>
      <Outlet />
    </div>
  )
}

export default Navbar
