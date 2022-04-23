// TMP static vars
import { userList } from '../../data/users'

import MainContainer from '../../components/MainContainer'
import { User } from '../../types/user'
import MainUser from './MainUser'
import ProfileMasonry from './ProfileMasonry'
import SocialButton from './SocialButton'
import Friends from './Friends'
import MatchHistory from './MatchHistory'
import FriendRequests from './FriendRequests'
import Blocked from './Blocked'
import { useState } from 'react'
import PopUpBox from '../../components/PopUpBox'

interface Props {
  user: User
  setConnected: React.Dispatch<React.SetStateAction<boolean>>
}

export default function UserProfile({ user, setConnected }: Props) {
  function logout() {
    setConnected(false)
  }
  const [editOpen, setEditOpen] = useState(false)

  return (
    <MainContainer>
      <PopUpBox open={editOpen} setOpen={setEditOpen}>
        <h1>UserOptions</h1>
      </PopUpBox>
      <ProfileMasonry>
        <MainUser user={user}>
          <SocialButton content="Log Out" handleClick={(e) => logout()} />
          <SocialButton content="Edit" handleClick={(e) => setEditOpen(true)} />
        </MainUser>
        <Friends />
        <MatchHistory user={user} />
        <FriendRequests requests={userList} />
        <Blocked blocked={[userList[1]]} />
      </ProfileMasonry>
    </MainContainer>
  )
}
