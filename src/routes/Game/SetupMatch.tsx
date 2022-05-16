import { useEffect } from 'react'
import { Socket } from 'socket.io-client'
import ContentBox from '../../components/ContentBox'
import Game, {
  GameBallSpeed,
  GameMaxPoints,
  GamePlayerHeight,
} from '../../types/game'
import { User } from '../../types/user'
import UserDesc from './UserDesc'

interface setupPayload {
  id: string
  maxPoints?: GameMaxPoints
  playerHeight?: GamePlayerHeight
  ballSpeed?: GameBallSpeed
  isPlayerReady?: boolean
}

interface ButtonProps {
  content: string
  isSelected: boolean
  payload: setupPayload
  isBig?: boolean
  socket: Socket
}
function SetupButton({
  content,
  isSelected,
  socket,
  payload,
  isBig = false,
}: ButtonProps) {
  const selectedStyle = isSelected ? 'border-violet' : 'border-gray-light'
  const size = isBig ? 'text-[2rem] m-3' : 'text-[1.2rem] m-1.5'
  return (
    <button
      onClick={() => {
        socket.emit('setupGame', payload, (response: any) => {
          console.log(response)
        })
      }}
      className={`bg-gray-light border-4 rounded-2xl p-1 group w-fit ease-in-out duration-150 hover:bg-violet hover:border-violet ${selectedStyle}`}
    >
      <p
        className={`${size} font-semibold ease-in-out duration-150 group-hover:text-white`}
      >
        {content}
      </p>
    </button>
  )
}

interface SetupProps {
  setStep: React.Dispatch<React.SetStateAction<string>>
  socket: Socket
  game: Game
  setGame: React.Dispatch<React.SetStateAction<Game | null>>
  currUser: User
}

export default function SetupMatch({
  setStep,
  socket,
  game,
  setGame,
  currUser,
}: SetupProps) {
  useEffect(() => {
    socket.on('setupGame', (data) => {
      setGame(data)
    })
    socket.on('startGame', (data) => {
      setGame(data)
    })
    return () => {
      socket.off('setupGame')
      socket.off('startGame')
    }
  }, [socket, setStep, setGame])

  const oppenent =
    game.player1.user.id === currUser.id ? game.player2 : game.player1
  const player =
    game.player1.user.id === currUser.id ? game.player1 : game.player2

  // Styling
  const optionGroupStyle = 'flex flex-col gap-2 items-center'
  const optionTitleStyle = 'font-semibold text-lg'
  const optionButtonDivStyle = 'flex gap-2'
  //dev
  console.log(game)
  return (
    <div className="flex items-center justify-evenly h-full w-full flex-wrap gap-5">
      <ContentBox className="flex flex-col gap-6 items-center">
        <div className={optionGroupStyle}>
          <h2 className={optionTitleStyle}>Paddle size</h2>
          <div className={optionButtonDivStyle}>
            <SetupButton
              content="Small"
              socket={socket}
              isSelected={game.playerHeight === GamePlayerHeight.SMALL}
              payload={{ id: game.id, playerHeight: GamePlayerHeight.SMALL }}
            />
            <SetupButton
              content="Normal"
              socket={socket}
              isSelected={game.playerHeight === GamePlayerHeight.MEDIUM}
              payload={{ id: game.id, playerHeight: GamePlayerHeight.MEDIUM }}
            />
            <SetupButton
              content="Large"
              socket={socket}
              isSelected={game.playerHeight === GamePlayerHeight.LARGE}
              payload={{ id: game.id, playerHeight: GamePlayerHeight.LARGE }}
            />
          </div>
        </div>
        <div className={optionGroupStyle}>
          <h2 className={optionTitleStyle}>Ball Speed</h2>
          <div className={optionButtonDivStyle}>
            <SetupButton
              content="Slow"
              socket={socket}
              isSelected={game.ballSpeed === GameBallSpeed.SLOW}
              payload={{ id: game.id, ballSpeed: GameBallSpeed.SLOW }}
            />
            <SetupButton
              content="Normal"
              socket={socket}
              isSelected={game.ballSpeed === GameBallSpeed.MEDIUM}
              payload={{ id: game.id, ballSpeed: GameBallSpeed.MEDIUM }}
            />
            <SetupButton
              content="Fast"
              socket={socket}
              isSelected={game.ballSpeed === GameBallSpeed.FAST}
              payload={{ id: game.id, ballSpeed: GameBallSpeed.FAST }}
            />
          </div>
        </div>
        <div className={optionGroupStyle}>
          <h2 className={optionTitleStyle}>Points</h2>
          <div className={optionButtonDivStyle}>
            <SetupButton
              content="5"
              socket={socket}
              isSelected={game.maxPoints === GameMaxPoints.FIVE}
              payload={{ id: game.id, maxPoints: GameMaxPoints.FIVE }}
            />
            <SetupButton
              content="10"
              socket={socket}
              isSelected={game.maxPoints === GameMaxPoints.TEN}
              payload={{ id: game.id, maxPoints: GameMaxPoints.TEN }}
            />
            <SetupButton
              content="15"
              socket={socket}
              isSelected={game.maxPoints === GameMaxPoints.FIFTEEN}
              payload={{ id: game.id, maxPoints: GameMaxPoints.FIFTEEN }}
            />
          </div>
        </div>
        <div className="mt-3">
          <SetupButton
            content="Ready"
            socket={socket}
            isSelected={player.isReady}
            payload={{ id: game.id, isPlayerReady: !player.isReady }}
            isBig
          />
        </div>
      </ContentBox>
      <UserDesc user={oppenent.user} role="Oppenent">
        <div
          className={
            `border-4 rounded-2xl p-1 w-fit ease-in-out duration-150 ` +
            (oppenent.isReady ? 'border-violet bg-gray-light' : 'border-white')
          }
        >
          <p className="text-[1.2rem] m-1.5 font-semibold">Ready</p>
        </div>
      </UserDesc>
    </div>
  )
}
