import { MouseEvent } from 'react'
import ContentBox from './ContentBox'

interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  children: React.ReactNode
  className?: string
}

export default function PopUpBox({
  open,
  setOpen,
  children,
  className = '',
}: Props) {
  const display = open ? 'flex' : 'hidden'

  function handleClick(event: MouseEvent) {
    event.stopPropagation()
  }

  return (
    <div
      className={`${display} z-10 bg-opacity-80 bg-violet-black items-center justify-center fixed w-screen h-screen inset-0 `}
      onClick={(e) => setOpen(false)}
    >
      <ContentBox
        handleClick={handleClick}
        className={`max-w-[95vw] m-4 p-5 ${className}`}
      >
        {children}
      </ContentBox>
    </div>
  )
}
