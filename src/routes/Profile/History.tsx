import { userInfo } from 'os'
import { Link } from 'react-router-dom'
import Avatar from '../../components/Avatar'
import ContentBox from '../../components/ContentBox'
import { User, MatchHistory } from '../../types/user'

interface Props {
  user: User
}

export default function History({ user }: Props) {
  function renderMatch(match: MatchHistory, id: number) {
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
              avatarId={user.avatarId}
            />
            <span className="font-semibold text-lg">
              {match.scorePlayer} - {match.scoreOppenent}
            </span>
            <Avatar
              size="h-9 w-9"
              username={match.oppenent.username}
              avatarId={match.oppenent.avatarId}
            />
          </div>
        </div>
      </div>
    )
  }
  return (
    <ContentBox className="w-[400px] flex flex-col  pt-3 px-6 grid-item mb-10 max-h-[75vh]">
      <h1 className={'mb-4 text-[2rem] leading-[2.625rem] font-semibold'}>
        Match History
      </h1>
      <div className="duration-300 overflow-hidden hover:overflow-auto flex flex-col gap-3 pr-0 scrollbar">
        {user.history.map((match, index) => renderMatch(match, index))}
      </div>
    </ContentBox>
  )
}
