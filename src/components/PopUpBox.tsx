import { MouseEvent } from 'react'
import ContentBox from './ContentBox'

interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  children: React.ReactNode
}

export default function PopUpBox({ open, setOpen, children }: Props) {
  const display = open ? 'flex' : 'hidden'

  function handleClick(event: MouseEvent) {
    event.stopPropagation()
  }

  return (
    <div
      className={`${display} bg-opacity-80 bg-violet-black items-center justify-center fixed w-screen h-screen inset-0 `}
      onClick={(e) => setOpen(false)}
    >
      <ContentBox handleClick={handleClick} className="fit p-5">
        {children}
      </ContentBox>
    </div>
  )
}
