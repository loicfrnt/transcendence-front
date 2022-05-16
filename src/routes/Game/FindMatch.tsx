import { Socket } from 'socket.io-client'
import ContentBox from '../../components/ContentBox'

interface FindMatchProps {
  setStep: React.Dispatch<React.SetStateAction<string>>
  socket: Socket
}

export default function FindMatch({ setStep, socket }: FindMatchProps) {
  function handleClick() {
    socket.emit('joinQueue', (rep: any) => console.log(rep))
    setStep('queue')
  }

  return (
    <div className="flex items-center justify-evenly h-full w-full">
      <ContentBox button handleClick={(e) => handleClick()}>
        <p className="font-semibold text-[2rem] m-3 ease-in-out duration-300 group-hover:text-white">
          Find match
        </p>
      </ContentBox>
    </div>
  )
}
