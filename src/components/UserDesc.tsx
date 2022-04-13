import { User } from '../types/user'
import { Link } from 'react-router-dom'
import Avatar from './Avatar'

export default function UserDesc({ user }: { user: User }) {
  function ratio(victories: number, defeats: number): number {
    if (!defeats) {
      return victories ? 1 : 0
    }
    return victories / defeats
  }
  return (
    <div>
      <Avatar username={user.username} avatarId={user.avatarId} />
      <h2>{user.username}</h2>
      <div>
        <div>{user.victories} Wins</div>
        <div>{user.defeats} Loses</div>
        <div>{ratio(user.victories, user.defeats)} Ratio</div>
      </div>
    </div>
  )
}
