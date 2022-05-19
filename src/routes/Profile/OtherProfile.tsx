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

interface Props {
  user: User
  socket: Socket
}

export default function OtherProfile({ user, socket }: Props) {
  const params = useParams()
  const username = params.username!
  const isFriend = (firstUser: User, secondUser: User) => {
    if (firstUser.received_relationships)
      for (let relationship of firstUser.received_relationships) {
        if (
          (relationship.issuer_id === firstUser.id &&
            relationship.receiver_id === secondUser?.id) ||
          (relationship.issuer_id === secondUser?.id &&
            relationship.receiver_id === firstUser.id)
        ) {
          if (relationship.status === RelStatus.Blocked) setIsBlocked(true)
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
          if (relationship.status === RelStatus.Blocked) setIsBlocked(true)
          return true
        }
      }
    return false
  }
  let navigate = useNavigate()
  const useUser = async (username: string) => {
    const [otherUser, setOtherUser] = useState<User>()
    useEffect(() => {
      if (user.username === username)
        navigate('/profile');
      else
        usersService.getByUsername(username).then(
          (response) => {
            setOtherUser(response)
            getRelations(response);
          },
          () => {
            navigate('/404')
          }
        )
    }, [username])
    return await Promise.resolve(otherUser)
  }
  const [otherUser, setOtherUser] = useState<User>()
  const [rmContent, setRmContent] = useState<string>('Unfriend')
  const [isBlocked, setIsBlocked] = useState<boolean>(false)
  useUser(username).then((otherUser) => {
    setOtherUser(otherUser)
    setFriend(isFriend(currUser!, otherUser!))
    if (isBlocked === true) navigate('/404')
  })

  const [friend, setFriend] = useState<boolean>(false)
  const [currUser, setCurrUser] = useState<User>(user)
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
  const [friendsList, setFriendsList] = useState<User[]>();

  const getRelations = async (currUser: User) => {
    let friends : User[] = [];
    if (currUser.received_relationships)
    {
      for (let relationship of currUser.received_relationships) {
        if (relationship.status === RelStatus.Friends)
        {
          const user = await usersService.getById(relationship.issuer_id);
          if (!friends.includes(user))
            friends.push(user);
        }
      }
    }
    if (currUser.sent_relationships)
    {
      for (let relationship of currUser.sent_relationships) {
        if (relationship.status === RelStatus.Friends)
        {
          const user = await usersService.getById(relationship.receiver_id);
          if (!friends.includes(user))
            friends.push(user);
        }
      }
    }
    setFriendsList(friends);
  }

  return (
    <MainContainer>
      {otherUser && <ProfileMasonry>
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
          {/* isIngame ? Spectate : Duel */}
          <SocialButton content="Spectate" handleClick={(e) => null} />
          <SocialButton
            content="Block"
            handleClick={() => {
              block()
            }}
          />
        </MainUser>
        <Friends userList={friendsList} />
        <MatchHistory user={otherUser} />
      </ProfileMasonry>
      }
    </MainContainer>
  )
}
