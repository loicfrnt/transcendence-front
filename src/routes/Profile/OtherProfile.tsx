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

export default function OtherProfile({user} : {user: User}) {
  const params = useParams();
  const username = params.username!;
  const isFriend = (firstUser: User, secondUser: User) => {
    console.log(secondUser);
    if (firstUser.received_relationships)
      for(let relationship of firstUser.received_relationships)
      {
        if ((relationship.issuer_id === firstUser.id && relationship.receiver_id === secondUser?.id) || 
        (relationship.issuer_id === secondUser?.id && relationship.receiver_id === firstUser.id))
        {
          return true;
        }
      }
    if (firstUser.sent_relationships)
      for(let relationship of firstUser.sent_relationships)
      {
        if ((relationship.issuer_id === firstUser.id && relationship.receiver_id === secondUser?.id) || 
        (relationship.issuer_id === secondUser?.id && relationship.receiver_id === firstUser.id))
        {
          if (relationship.status === RelStatus.Pending && relationship.issuer_id === firstUser.id)
            setRmContent("Unrequest");
          return true;
        }
      }
    return false;
  }

  const useUser = async (username: string) => {
    let navigate = useNavigate();
    const [otherUser, setOtherUser] = useState<User>();
    useEffect(() => {
      usersService.getByUsername(username).then((response) => {
        setOtherUser(response);
      }, () => {
        navigate("/404");
      });
    }, [username, navigate]);
    return await Promise.resolve(otherUser);
  }
  const [otherUser, setOtherUser] = useState<User>();
  const [rmContent, setRmContent] = useState<string>("Unfriend");
  useUser(username). then((otherUser) => {
    setOtherUser(otherUser);
    setFriend(isFriend(user,otherUser!));
  });

  const [friend, setFriend] = useState<boolean>(false);

  function addFriend() {
    userRelationshipService.add(otherUser!.id).then(() => {
      setFriend(true);
    });
  }

  function removeFriend() {
    userRelationshipService.delete(otherUser!.id).then((response) => {
      localStorage.setItem("user", JSON.stringify(response.data));
      user = authenticationService.getCurrentUser();
      setFriend(false);
      console.log(friend);
    });
  }

  return (
    <MainContainer>
      <ProfileMasonry>
        <MainUser user={otherUser!}>
          { friend ? 
            <SocialButton content={rmContent} handleClick={() => {removeFriend()}} />
            :
            <SocialButton content="Add friend" handleClick={() => {addFriend()}} />
          }
          <SocialButton content="Message" handleClick={(e) => null} />
          {/* isIngame ? Spectate : Duel */}
          <SocialButton content="Spectate" handleClick={(e) => null} />
          <SocialButton content="Block" handleClick={(e) => null} />
        </MainUser>
        <Friends user={user}/>
        <MatchHistory user={user}/>
      </ProfileMasonry>
    </MainContainer>
  )
}
