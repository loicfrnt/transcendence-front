import { Link } from 'react-router-dom'
import Avatar from '../../components/Avatar'
import { User, History } from '../../types/user'
import SocialItemContainer from './SocialItemContainer'
import SocialItemList from './SocialItemList'
import SocialNoItem from './SocialNoItem'

interface Props {
  user: User
}

export default function MatchHistory({ user }: Props) {
  function renderMatch(match: History, id: number) {
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
              noLink
              size="h-9 w-9"
              username={user.username}
              avatarId={user.avatar_id}
            />
            <span className="font-semibold text-lg">
              {match.scorePlayer} - {match.scoreOppenent}
            </span>
            <Avatar
              size="h-9 w-9"
              username={match.oppenent.username}
              avatarId={match.oppenent.avatar_id}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <SocialItemContainer title="Match History">
      {!user.history ? (
        <SocialNoItem msg="No match played" />
      ) : (
        <SocialItemList>
          <>{user.history.map(renderMatch)}</>
        </SocialItemList>
      )}
    </SocialItemContainer>
  )
}
