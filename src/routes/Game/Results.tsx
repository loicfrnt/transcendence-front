import { User } from '../../types/user'
import ContentBox from '../../components/ContentBox'
import { Socket } from 'socket.io-client'
import Game from '../../types/game'

interface Props {
  currUser: User
  socket: Socket
  game: Game
  setGame: React.Dispatch<React.SetStateAction<Game | null>>
  setStep: React.Dispatch<React.SetStateAction<string>>
}

export default function Results({
  currUser,
  socket,
  game,
  setGame,
  setStep,
}: Props) {
  const oppenent =
    game.player1.user.id === currUser.id ? game.player2 : game.player1
  const player =
    game.player1.user.id === currUser.id ? game.player1 : game.player2
  const winner = (oppenent.score ?? 1) < (player.score ?? 0)
  const color = winner ? 'text-green' : 'text-red'
  return (
    <div
      className={`flex flex-col items-center justify-center gap-10 h-full w-full`}
    >
      <ContentBox className="max-w-[255px] pt-[6px] flex flex-col items-center gap-2">
        <h2
          className={`font-body font-semibold text-[2rem] leading-[2.625rem] ${color}`}
        >
          {winner ? 'Victory' : 'Defeat'}
        </h2>
        <span className="font-semibold text-[2rem]">
          {game.player1.score} - {game.player2.score}
        </span>
      </ContentBox>
      <button
        onClick={() => {
          socket.emit('joinQueue', (rep: any) => console.log(rep))
          setStep('queue')
          setGame(null)
        }}
        className="bg-white p-3 rounded-2xl hover:bg-violet group ease-in-out duration-300 "
      >
        <p className="font-semibold text-[2rem] m-3 ease-in-out duration-300 group-hover:text-white">
          Find another match
        </p>
      </button>
    </div>
  )
}
