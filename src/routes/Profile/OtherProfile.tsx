import { useParams } from 'react-router-dom'
import MainContainer from '../../components/MainContainer'
import MainUser from './MainUser'
import SocialButton from './SocialButton'
import ProfileMasonry from './ProfileMasonry'
import Friends from './Friends'
import MatchHistory from './MatchHistory'
import { User } from '../../types/user'

export default function OtherProfile({user} : {user: User}) {
  const params = useParams()
  const username = params.username

  user.username = username as string

  return (
    <MainContainer>
      <ProfileMasonry>
        <MainUser user={user}>
          {/* isFriend ? RemoveFriend : AddFriend */}
          <SocialButton content="Add Friend" handleClick={(e) => null} />
          <SocialButton content="Message" handleClick={(e) => null} />
          {/* isIngame ? Spectate : Duel */}
          <SocialButton content="Spectate" handleClick={(e) => null} />
          <SocialButton content="Block" handleClick={(e) => null} />
        </MainUser>
        <Friends />
        <MatchHistory user={user} />
      </ProfileMasonry>
    </MainContainer>
  )
}
