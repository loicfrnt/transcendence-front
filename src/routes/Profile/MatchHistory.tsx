import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../../components/Avatar'
import { User, GameHistory } from '../../types/user'
import SocialItemContainer from './SocialItemContainer'
import SocialItemList from './SocialItemList'
import SocialNoItem from './SocialNoItem'

interface Props {
  user: User
}

export default function MatchHistory({ user }: Props) {
  function renderMatch(match: GameHistory, id: number) {
    const winText = match.won ? 'Won' : 'Lost'
    const winClass = 'font-semibold ' + (match.won ? 'text-green' : 'text-red')

    return (
      <div key={id}>
        <div className="bg-gray-light rounded-3xl h-24 pl-2 w-full flex flex-col items-center justify-center gap-2 ">
          <span className="text-lg">
            <span className={winClass}>{winText}</span>
            {' against '}
            <Link
              className="font-semibold"
              to={'/profile/' + match.oppenent.username}
            >
              {match.oppenent.username}
            </Link>
          </span>
          <div className="flex items-center gap-3">
            <Avatar
              withStatus={false}
              size="h-9 w-9"
              username={user.username}
              avatarId={user.avatar_id}
              status={user.status}
            />
            <span className="font-semibold text-lg">
              {match.scorePlayer} - {match.scoreOppenent}
            </span>
            <Avatar
              withStatus={false}
              size="h-9 w-9"
              username={match.oppenent.username}
              avatarId={match.oppenent.avatar_id}
              status={match.oppenent.status}
            />
          </div>
        </div>
      </div>
    )
  }
  const [gameHistory, setGameHistory] = useState<GameHistory[]>([])

  useEffect(() => {
    setGameHistory((curr) => {
      let newHist: GameHistory[] = []
      user.gamesAsPlayer1.forEach((game) => {
        console.log(game)
        newHist.push({
          oppenent: game.player2,
          scoreOppenent: game.player2Points as number,
          scorePlayer: game.player1Points as number,
          won: game.player1Points >= game.player2Points,
          created_at: game.created_at,
        })
      })
      user.gamesAsPlayer2.forEach((game) => {
        newHist.push({
          oppenent: game.player1,
          scoreOppenent: game.player1Points as number,
          scorePlayer: game.player2Points as number,
          won: game.player2Points >= game.player1Points,
          created_at: game.created_at,
        })
      })
      newHist.sort((a, b) => {
        let d1 = Date.parse(a.created_at)
        let d2 = Date.parse(b.created_at)
        return d2 - d1
      })
      return newHist
    })
  }, [user.gamesAsPlayer1, user.gamesAsPlayer2])

  console.log(gameHistory.length)

  return (
    <SocialItemContainer title="Match History">
      {!gameHistory.length ? (
        <SocialNoItem msg="No match played" />
      ) : (
        <SocialItemList>
          <>{gameHistory.map(renderMatch)}</>
        </SocialItemList>
      )}
    </SocialItemContainer>
  )
}
