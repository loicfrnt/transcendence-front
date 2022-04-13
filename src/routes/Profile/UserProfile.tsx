import LogOut from '../../components/LogOut'

interface UserProfileProps {
  setConnected: React.Dispatch<React.SetStateAction<boolean>>
}

export default function UserProfile({ setConnected }: UserProfileProps) {
  return (
    <div>
      <h1>Profile</h1>
      <p>la les profils ue</p>
      <LogOut setConnected={setConnected} />
    </div>
  )
}
