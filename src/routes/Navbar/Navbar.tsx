import { Outlet, Link, NavLink } from 'react-router-dom'
import { ReactComponent as Home } from './home.svg'
import { ReactComponent as Game } from './game.svg'
import { ReactComponent as GameActive } from './gameActive.svg'
import { ReactComponent as Profile } from './profile.svg'
import { ReactComponent as ProfileActive } from './profileActive.svg'
import { ReactComponent as Chat } from './chat.svg'
import { ReactComponent as ChatActive } from './chatActive.svg'

function Navbar() {
  // function renderLinkHome() {
  //   return (
  //     <NavLink to="" className="flex justify-center mb-10">
  //       <div className="bg-gray-light h-[77px] w-[77px] rounded py-[4px]">
  //         <div className="flex justify-center">
  //           <img src={home} alt="Home" />
  //         </div>
  //       </div>
  //     </NavLink>
  //   )
  // }

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
                'h-[77px] w-[77px] rounded-lg py-[4px] hover:bg-gray-light' +
                (isActive ? ' bg-gray-light' : '')
              }
            >
              <div className="flex justify-center">
                {/* <img
                  src={isActive ? svgActive : svg}
                  alt={to}
                  className="hover:fill-violet"
                /> */}
                <Svg
                  className={
                    isActive ? 'fill-violet' : 'fill-gray hover:fill-violet'
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
        {/* {renderLinkHome()} */}
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
