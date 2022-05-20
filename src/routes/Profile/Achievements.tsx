import { Link } from 'react-router-dom'
import Avatar from '../../components/Avatar'
import { User } from '../../types/user'
import SocialItemContainer from './SocialItemContainer'
import SocialItemList from './SocialItemList'

interface Props {
  user: User
}

export default function Friends({ user }: Props) {
  function renderFriend(user: User, id: number) {
    return (
      <div key={id}>
        <Link
          to={'/profile/' + user.username}
          className="bg-gray-light rounded-3xl h-24 pl-2 w-full flex items-center gap-5"
        >
          <Avatar
            size="h-20 w-20"
            username={user.username}
            avatarId={user.avatar_id}
            status={user.status}
            addStatus={true}
            noLink
          ></Avatar>
          <h2 className="font-semibold text-lg">{user.username}</h2>
        </Link>
      </div>
    )
  }
  return (
    <SocialItemContainer title="Achievements">
      <SocialItemList>
        <p>liste d'achievements</p>
      </SocialItemList>
    </SocialItemContainer>
  )
}
