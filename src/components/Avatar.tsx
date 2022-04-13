import { Link } from 'react-router-dom'

interface AvatarProps {
  avatarId: number
  username: string
  link?: boolean
}

export default function Avatar({
  avatarId,
  username,
  link = true,
}: AvatarProps) {
  if (link) {
    return (
      <Link to={'/profile/' + username}>
        <img
          src={'http://localhost:3000/local-files/' + avatarId}
          alt={'Profile picture of ' + username}
        />
      </Link>
    )
  }
  return (
    <img
      src={'http://localhost:3000/local-files/' + avatarId}
      alt={'Profile picture of ' + username}
    />
  )
}
