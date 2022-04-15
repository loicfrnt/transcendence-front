import { useParams } from 'react-router-dom'
import MainContainer from '../../components/MainContainer'

export default function OtherProfile() {
  const params = useParams()
  const username = params.username
  return (
    <MainContainer>
      <h1>Other Profile</h1>
      <p>ce le profil de {username}</p>
    </MainContainer>
  )
}
