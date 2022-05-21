import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../../components/Avatar'
import { User, GameHistory } from '../../types/user'
import SocialItemContainer from './SocialItemContainer'
import SocialItemList from './SocialItemList'
import SocialNoItem from './SocialNoItem'
import GameService from '../../services/game.service'

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
              size="h-9 w-9"
              username={user.username}
              avatarId={user.avatar_id}
              status={user.status}
              noLink
            />
            <span className="font-semibold text-lg">
              {match.scorePlayer} - {match.scoreOppenent}
            </span>
            <Avatar
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
    setGameHistory(() => {
      return GameService.getGameHistory(user);
    })
  }, [user.gamesAsPlayer1, user.gamesAsPlayer2])

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
