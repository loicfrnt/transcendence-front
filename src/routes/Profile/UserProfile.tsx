import LogOut from '../../components/LogOut'
import MainContainer from '../../components/MainContainer'

interface UserProfileProps {
  setConnected: React.Dispatch<React.SetStateAction<boolean>>
}

export default function UserProfile({ setConnected }: UserProfileProps) {
  return (
    <MainContainer>
      <h1>Profile</h1>
      <p>la les profils ue</p>
      <LogOut setConnected={setConnected} />
    </MainContainer>
  )
}
