import { useParams } from 'react-router-dom'
import MainContainer from '../../components/MainContainer'
import MainUser from './MainUser'

import { thisUser as user } from '../../data/users' // TMP
import SocialButton from './SocialButton'
import ProfileMasonry from './ProfileMasonry'
import Friends from './Friends'

export default function OtherProfile() {
  const params = useParams()
  const username = params.username

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
        <MainUser user={user} />
        <MainUser user={user} />
        <MainUser user={user} />
        <MainUser user={user} />
        <MainUser user={user} />
      </ProfileMasonry>
    </MainContainer>
  )
}
