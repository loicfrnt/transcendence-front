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
  return (
    <div className="flex h-full font-body text-sm">
      <nav className="bg-white  space-y-6 flex flex-col w-[88px] px-[5px] pt-3 ">
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
