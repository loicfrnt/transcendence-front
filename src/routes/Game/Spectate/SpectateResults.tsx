import ContentBox from '../../../components/ContentBox'
import Game from '../../../types/game'
import UserDesc from '../UserDesc'
interface Props {
  game: Game
}

export default function SpectateResults({ game }: Props) {
  const winner =
    (game.player1.score ?? 1) > (game.player2.score ?? 0)
      ? game.player1
      : game.player2
  return (
    <div
      className={`flex flex-col items-center justify-center gap-10 h-full w-full`}
    >
      <ContentBox>
        <p className="font-semibold text-[2rem]">
          <span>{game.player1.score}</span> - <span>{game.player2.score}</span>
        </p>
      </ContentBox>
      <UserDesc user={winner.user} role="Winner is" />
    </div>
  )
}
