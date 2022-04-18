import { Link } from 'react-router-dom'
import avatar from './avatar.png'

interface AvatarProps {
  avatarId: number
  username: string
  noLink?: boolean
  size?: string
}

export default function Avatar({
  avatarId,
  username,
  noLink = false,
  size = 'h-16 w-16',
}: AvatarProps) {
  const classes = `block bg-cover rounded-full ${size}`
  //const avatar = 'http://localhost:3000/local-files/' + avatarId

  if (!noLink) {
    return (
      <Link
        className={classes}
        style={{ backgroundImage: `url(${avatar})` }}
        to={'/profile/' + username}
      />
    )
  }
  return (
    <div className={classes} style={{ backgroundImage: `url(${avatar})` }} />
  )
}
