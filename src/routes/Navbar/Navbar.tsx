import { Outlet, NavLink } from 'react-router-dom'
import { ReactComponent as Home } from '../../assets/home.svg'
import { ReactComponent as Game } from '../../assets/game.svg'
import { ReactComponent as Profile } from '../../assets/profile.svg'
import { ReactComponent as Chat } from '../../assets/chat.svg'
import { Socket } from 'socket.io-client'
import { useEffect, useRef } from 'react'
import animateCSS from '../../utils/animateCSS'
import 'animate.css'

interface NavbarLinkProps {
  to: string
  Svg: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  socket?: Socket
}

function NavbarLink({ to, Svg, socket }: NavbarLinkProps) {
  useEffect(() => {
    const animate = () =>
      iconRef.current && animateCSS(iconRef.current, 'headShake')
    socket?.on('newDuelInvitation', animate)
    return () => {
      socket?.off('newDuelInvitation', animate)
    }
  }, [socket])

  const iconRef = useRef<HTMLDivElement | null>(null)

  return (
    <NavLink
      to={to}
      className={'flex shrink justify-center' + (Svg === Home ? ' mb-3' : '')}
    >
      {({ isActive }) => {
        return (
          <div
            className={
              'ease-in-out duration-300 group h-[76px] w-[76px] rounded-xl hover:bg-gray-light flex flex-col justify-between mx-3 mini:mx-0' +
              (isActive ? ' bg-gray-light' : '') +
              (Svg !== Home
                ? ' pt-[10px] mini:py-[10px] '
                : ' pt-[7px] hidden mini:flex')
            }
          >
            <div className="flex justify-center" ref={iconRef}>
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
                (isActive ? 'text-violet' : 'text-gray group-hover:text-violet')
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

interface Props {
  socket: Socket
}

function Navbar({ socket }: Props) {
  useEffect(() => {
    window.addEventListener('resize', () => {
      // We execute the same script as before
      let vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    })
  })
  return (
    <div className="flex flex-col mini:flex-row font-body text-sm h-full w-full fixed">
      <nav className="bg-white justify-center mini:justify-start gap-y-6 flex mini:flex-col h-[88px] w-full mini:h-full mini:w-[88px] p-[5px] mini:pt-3 border-b mini:border-0">
        <NavbarLink to="" Svg={Home} />
        <NavbarLink to="game" Svg={Game} socket={socket} />
        <NavbarLink to="profile" Svg={Profile} />
        <NavbarLink to="chat" Svg={Chat} />
      </nav>
      <Outlet />
    </div>
  )
}

export default Navbar
