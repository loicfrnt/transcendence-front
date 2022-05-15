import { Socket } from 'socket.io-client'
import ContentBox from '../../components/ContentBox'
import Game from '../../types/game'
import { User } from '../../types/user'
import UserDesc from './UserDesc'

interface FindMatchProps {
  setStep: React.Dispatch<React.SetStateAction<string>>
  socket: Socket
  game: Game
  setGame: React.Dispatch<React.SetStateAction<Game | null>>
  currUser: User
}
interface ButtonProps {
  content: string
  selected: boolean
  handleClick: () => any
  big?: boolean
}
function SetupButton({
  content,
  selected,
  handleClick,
  big = false,
}: ButtonProps) {
  const selectedStyle = selected ? 'border-4 border-violet' : ''
  const size = big ? 'text-[2rem] m-3' : 'text-[1.4rem] m-2'
  return (
    <button
      onClick={handleClick}
      className={`bg-gray-light rounded-2xl p-1 group ease-in-out duration-300 hover:bg-violet w-fit ${selectedStyle}`}
    >
      <p
        className={`${size} font-semibold ease-in-out duration-300 group-hover:text-white`}
      >
        {content}
      </p>
    </button>
  )
}

export default function SetupMatch({
  setStep,
  socket,
  game,
  setGame,
  currUser,
}: FindMatchProps) {
  const oppenent =
    game.player1.user.id === currUser.id ? game.player2 : game.player1
  const optionGroupStyle = 'flex flex-col gap-2 items-center'
  const optionTitleStyle = 'font-semibold text-lg'
  return (
    <div className="flex items-center justify-evenly h-full w-full">
      <ContentBox className="flex flex-col gap-6 items-center">
        <div className={optionGroupStyle}>
          <h2 className={optionTitleStyle}>Ball Speed</h2>
          <div className="flex gap-2">
            <SetupButton
              content="Slow"
              selected={false}
              handleClick={() => null}
            />
            <SetupButton
              content="Normal"
              selected={false}
              handleClick={() => null}
            />
            <SetupButton
              content="Fast"
              selected={false}
              handleClick={() => null}
            />
          </div>
        </div>
        <div className={optionGroupStyle}>
          <h2 className={optionTitleStyle}>Ball Speed</h2>
          <div className="flex gap-2">
            <SetupButton
              content="Slow"
              selected={false}
              handleClick={() => null}
            />
            <SetupButton
              content="Normal"
              selected={false}
              handleClick={() => null}
            />
            <SetupButton
              content="Fast"
              selected={false}
              handleClick={() => null}
            />
          </div>
        </div>
        <SetupButton
          content="Ready"
          selected={false}
          handleClick={() => null}
          big
        />
      </ContentBox>
      <UserDesc user={oppenent.user} role="Matched against" />
    </div>
  )
}
