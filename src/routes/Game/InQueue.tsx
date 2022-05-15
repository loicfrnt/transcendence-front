import { useEffect } from 'react'
import { Socket } from 'socket.io-client'
import { ReactComponent as SvgSpinner } from '../../assets/spinner.svg'
import Game from '../../types/game'

interface FindMatchProps {
  setStep: React.Dispatch<React.SetStateAction<string>>
  setGame: React.Dispatch<React.SetStateAction<Game | null>>
  socket: Socket
}

export default function InQueue({ setStep, socket, setGame }: FindMatchProps) {
  useEffect(() => {
    socket.on('setupGame', (data) => {
      setStep('setup')
      setGame(data)
      console.log('switch to setup', data)
    })
    return () => {
      socket.off('setupGame')
    }
  }, [socket, setStep, setGame])

  return (
    <div className="flex flex-col items-center justify-center h-full w-full gap-8">
      <p className="font-semibold text-[2rem]">Waiting for an oppenent</p>
      <SvgSpinner className="fill-violet h-16 w-16 animate-spin" />
    </div>
  )
}
