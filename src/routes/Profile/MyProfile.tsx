import MainContainer from '../../components/MainContainer'
import { User } from '../../types/user'
import MainUser from './MainUser'
import ProfileMasonry from './ProfileMasonry'
import SocialButton from './SocialButton'

interface Props {
  user: User
  setConnected: React.Dispatch<React.SetStateAction<boolean>>
}

export default function UserProfile({ user, setConnected }: Props) {
  function logout() {
    setConnected(false)
  }

  return (
    <MainContainer>
      <ProfileMasonry>
        <MainUser user={user}>
          <SocialButton content="Log Out" handleClick={(e) => logout()} />
          <SocialButton content="Edit" handleClick={(e) => null} />
        </MainUser>
      </ProfileMasonry>
    </MainContainer>
  )
}
