import Avatar from '../../components/Avatar'
import { RelStatus, User } from '../../types/user'
import SocialItemContainer from './SocialItemContainer'
import SocialItemList from './SocialItemList'
import SocialNoItem from './SocialNoItem'
import { ReactComponent as Accept } from '../../assets/accept.svg'
import { ReactComponent as Reject } from '../../assets/reject.svg'
import { useEffect, useState } from 'react'
import usersService from '../../services/users.service'
import userRelationshipService from '../../services/user-relationship.service'

interface Props {
  user : User
}

export default function FriendRequests({ user }: Props) {
  const svgClass = 'ease-in-out duration-300 fill-gray group-hover:fill-violet'

  function acceptRelation(id: number) {
    userRelationshipService.updateStatus(id, RelStatus.Friends).then((response) => {
      if (response.data.id) {
        localStorage.setItem("user", JSON.stringify(response.data));
        const arr = requests.filter((request) => request.id !== id)
        setRequests(arr);
    }
    });
  }

  function declineRelation(id: number) {
    userRelationshipService.delete(id).then((response) => {
localStorage.setItem("user", JSON.stringify(response.data));
        const arr = requests.filter((request) => request.id !== id)
        setRequests(arr);
    });
  }

  function renderRequest(user: User, id: number) {
    return (
      <div key={id}>
        <div className="flex justify-between bg-gray-light rounded-3xl h-24 pl-2 w-full ">
          <div className="flex items-center gap-5">
            <Avatar
              noLink={false}
              size="h-20 w-20"
              username={user.username}
              avatarId={user.avatar_id}
            ></Avatar>
            <h2 className="font-semibold text-lg">{user.username}</h2>
          </div>
          <div className="flex flex-col justify-center gap-1.5 h-full pr-3">
            <button className="group">
              <Accept className={svgClass} onClick={() => {acceptRelation(user.id);}}/>
            </button>
            <button className="group">
              <Reject className={svgClass} onClick={() => {declineRelation(user.id);}}/>
            </button>
          </div>
        </div>
      </div>
    )
  }

  const [requests, setRequests] = useState<User[]>([]);
  useEffect(() =>{
    if (user.received_relationships)
    {
      for (let relationship of user.received_relationships) {
        if (relationship.status === RelStatus.Pending)
          usersService.getById(relationship.issuer_id).then((response) => {
            if (!requests.includes(response))
              setRequests([...requests, response]);
          });
      }
    }
  },[]);

  function isObjectEmpty(obj: any) {
    return Object.keys(obj).length === 0;
  }

  return (
    <SocialItemContainer title="Friend Requests">
      {isObjectEmpty(requests) ? (
        <SocialNoItem msg="No requests.. (yet!)" />
      ) : (
        <SocialItemList>
          <>{requests.map(renderRequest)}</>
        </SocialItemList>
      )}
    </SocialItemContainer>
  )
}
