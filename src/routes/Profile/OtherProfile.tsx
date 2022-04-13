import { useParams } from 'react-router-dom'

export default function OtherProfile() {
  const params = useParams()
  const username = params.username
  return (
    <div>
      <h1>Other Profile</h1>
      <p>ce le profil de {username}</p>
    </div>
  )
}
