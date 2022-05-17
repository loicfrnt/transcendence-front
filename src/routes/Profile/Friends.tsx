import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../../components/Avatar'
import usersService from '../../services/users.service'
import { RelStatus, User } from '../../types/user'
import SocialItemContainer from './SocialItemContainer'
import SocialItemList from './SocialItemList'
import SocialNoItem from './SocialNoItem'

interface Props {
  user : User
}

export default function Friends({ user }: Props) {
  function renderFriend(user: User, id: number) {
    return (
      <div key={id}>
        <Link
          to={'/profile/' + user.username}
          className="bg-gray-light rounded-3xl h-24 pl-2 w-full flex items-center gap-5"
        >
          <Avatar
            noLink = {false}
            size="h-20 w-20"
            username={user.username}
            avatarId={user.avatar_id}
          ></Avatar>
          <h2 className="font-semibold text-lg">{user.username}</h2>
        </Link>
      </div>
    )
  }

  const [userList, setUserList] = useState<User[]>([]);
  useEffect(() =>{
    if (user.received_relationships)
    {
      for (let relationship of user.received_relationships) {
        if (relationship.status === RelStatus.Friends)
        {
          usersService.getById(relationship.issuer_id).then((response) => {
            if (!userList.includes(response))
              setUserList([...userList, response]);
          });
        }
      }
    }
    if (user.sent_relationships)
    {
      for (let relationship of user.sent_relationships) {
        if (relationship.status === RelStatus.Friends)
        {
          usersService.getById(relationship.receiver_id).then((response) => {
            if (!userList.includes(response))
              setUserList([...userList, response]);
          });
        }
      }
    }
  },[]);

  function isObjectEmpty(obj: any) {
    return Object.keys(obj).length === 0;
  }

  return (
    <SocialItemContainer title="Friends">
      {isObjectEmpty(userList) ? (
        <SocialNoItem msg="No one here :c" />
      ) : (
        <SocialItemList>
          <>{userList.map(renderFriend)}</>
        </SocialItemList>
      )}
    </SocialItemContainer>
  )
}
