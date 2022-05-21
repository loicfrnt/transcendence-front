import { useNavigate, useParams } from 'react-router-dom'
import MainContainer from '../../components/MainContainer'
import MainUser from './MainUser'
import SocialButton from './SocialButton'
import ProfileMasonry from './ProfileMasonry'
import Friends from './Friends'
import MatchHistory from './MatchHistory'
import { RelStatus, User } from '../../types/user'
import { useEffect, useState } from 'react'
import usersService from '../../services/users.service'
import userRelationshipService from '../../services/user-relationship.service'
import authenticationService from '../../services/authentication.service'
import dmUser from '../../utils/dmUser'
import { Socket } from 'socket.io-client'
import sendGameInvite from '../../utils/sendGameInvite'
import Spinner from '../../components/Spinner'
import Achievements from './Achievements'

interface Props {
  currUser: User
  setCurrUser: React.Dispatch<React.SetStateAction<User>>
  socket: Socket
}

export default function OtherProfile({ currUser, setCurrUser, socket }: Props) {
  const params = useParams()
  const username = params.username!

  let navigate = useNavigate()
  const [otherUser, setOtherUser] = useState<User | null>(null)
  const [rmContent, setRmContent] = useState<string>('Unfriend')
  const [friend, setFriend] = useState<boolean>(false)

  useEffect(() => {
    // Is user Friend
    const isFriend = (firstUser: User, secondUser: User) => {
      if (firstUser.received_relationships)
        for (let relationship of firstUser.received_relationships) {
          if (
            (relationship.issuer_id === firstUser.id &&
              relationship.receiver_id === secondUser?.id) ||
            (relationship.issuer_id === secondUser?.id &&
              relationship.receiver_id === firstUser.id)
          ) {
            if (relationship.status === RelStatus.Blocked) navigate('/404')
            return true
          }
        }
      if (firstUser.sent_relationships)
        for (let relationship of firstUser.sent_relationships) {
          if (
            (relationship.issuer_id === firstUser.id &&
              relationship.receiver_id === secondUser?.id) ||
            (relationship.issuer_id === secondUser?.id &&
              relationship.receiver_id === firstUser.id)
          ) {
            if (
              relationship.status === RelStatus.Pending &&
              relationship.issuer_id === firstUser.id
            )
              setRmContent('Unrequest')
            if (relationship.status === RelStatus.Blocked) navigate('/404')
            return true
          }
        }
      return false
    }
    // prevent seeing you own profile
    if (currUser.username === username) navigate('/profile')
    else
      usersService.getByUsername(username).then(
        (response) => {
          setOtherUser(response)
          getRelations(response)
          setFriend(isFriend(currUser, response))
        },
        () => {
          navigate('/404')
        }
      )
  }, [username, currUser, navigate])

  function addFriend() {
    userRelationshipService
      .add(otherUser!.id, RelStatus.Pending)
      .then((response) => {
        localStorage.setItem('user', JSON.stringify(response.data))
        setCurrUser(authenticationService.getCurrentUser())
        setFriend(true)
      })
  }

  function removeFriend() {
    userRelationshipService.delete(otherUser!.id).then((response) => {
      localStorage.setItem('user', JSON.stringify(response.data))
      setCurrUser(authenticationService.getCurrentUser())
      setFriend(false)
    })
  }

  function block() {
    if (friend) {
      userRelationshipService
        .updateStatus(otherUser!.id, RelStatus.Blocked)
        .then((response) => {
          if (response.data.id) {
            localStorage.setItem('user', JSON.stringify(response.data))
            navigate('/profile')
          }
        })
    } else {
      userRelationshipService
        .add(otherUser!.id, RelStatus.Blocked)
        .then((response) => {
          localStorage.setItem('user', JSON.stringify(response.data))
          navigate('/profile')
        })
    }
  }
  const [friendsList, setFriendsList] = useState<User[] | null>(null)

  const getRelations = async (currUser: User) => {
    let friends: User[] = []
    if (currUser.received_relationships) {
      for (let relationship of currUser.received_relationships) {
        if (relationship.status === RelStatus.Friends) {
          const user = await usersService.getById(relationship.issuer_id)
          if (!friends.includes(user)) friends.push(user)
        }
      }
    }
    if (currUser.sent_relationships) {
      for (let relationship of currUser.sent_relationships) {
        if (relationship.status === RelStatus.Friends) {
          const user = await usersService.getById(relationship.receiver_id)
          if (!friends.includes(user)) friends.push(user)
        }
      }
    }
    setFriendsList(friends)
  }

  return (
    <MainContainer>
      {!otherUser ? (
        <Spinner center />
      ) : (
        <ProfileMasonry>
          <MainUser user={otherUser}>
            {friend ? (
              <SocialButton
                content={rmContent}
                handleClick={() => {
                  removeFriend()
                }}
              />
            ) : (
              <SocialButton
                content="Add friend"
                handleClick={() => {
                  addFriend()
                }}
              />
            )}
            <SocialButton
              content="Message"
              handleClick={() => dmUser(otherUser, socket, navigate)}
            />
            <SocialButton
              content="Duel"
              handleClick={() => sendGameInvite(otherUser, socket)}
            />{' '}
            <SocialButton
              content="Spectate"
              handleClick={() => navigate('/game/' + otherUser?.username)}
            />
            <SocialButton
              content="Block"
              handleClick={() => {
                block()
              }}
            />
          </MainUser>
          <MatchHistory user={otherUser} />
          <Friends userList={friendsList} />
          <Achievements achievementHistory={otherUser.acheivements_history} />
        </ProfileMasonry>
      )}
    </MainContainer>
  )
}
