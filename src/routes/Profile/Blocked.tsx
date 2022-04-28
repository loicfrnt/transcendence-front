import { Link } from 'react-router-dom'
import Avatar from '../../components/Avatar'
import { User } from '../../types/user'
import SocialItemContainer from './SocialItemContainer'
import SocialItemList from './SocialItemList'
import SocialNoItem from './SocialNoItem'

interface Props {
  blocked: User[]
}

export default function Blocked({ blocked }: Props) {
  function renderBlocked(user: User, id: number) {
    return (
      <div key={id}>
        <Link
          to={'/profile/' + user.username}
          className="bg-gray-light rounded-3xl h-24 pl-2 w-full flex items-center gap-5"
        >
          <Avatar
            noLink
            size="h-20 w-20"
            username={user.username}
            avatarId={user.avatar_id}
          ></Avatar>
          <h2 className="font-semibold text-lg">{user.username}</h2>
        </Link>
      </div>
    )
  }

  return (
    <SocialItemContainer title="Blocked">
      <SocialItemList>
        {!blocked.length ? (
          <SocialNoItem msg="You didn't block anyone, great!!" />
        ) : (
          <>{blocked.map(renderBlocked)}</>
        )}
      </SocialItemList>
    </SocialItemContainer>
  )
}
