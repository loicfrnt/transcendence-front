import Avatar from '../../components/Avatar'
import { User } from '../../types/user'
import SocialItemContainer from './SocialItemContainer'
import SocialItemList from './SocialItemList'
import SocialNoItem from './SocialNoItem'
import { ReactComponent as Add } from '../../assets/block.svg'
import { useEffect, useState } from 'react'
import userRelationshipService from '../../services/user-relationship.service'
import Spinner from '../../components/Spinner'

interface Props {
  blocked?: User[] | null
  setCurrUser: React.Dispatch<React.SetStateAction<User>>
}

export default function Blocked({ blocked, setCurrUser }: Props) {
  const [blockedUsrs, setBlockedUsers] = useState<User[] | null>()
  useEffect(() => {
    setBlockedUsers(blocked)
  }, [blocked])
  function unblock(id: number) {
    userRelationshipService.delete(id).then((response) => {
      if (response.data.id) {
        localStorage.setItem('user', JSON.stringify(response.data))
        setCurrUser(response.data)
        const arr = blockedUsrs!.filter((request) => request.id !== id)
        setBlockedUsers(arr)
      }
    })
  }

  function renderBlocked(user: User, id: number) {
    return (
      <div key={id}>
        <div className="flex justify-between bg-gray-light rounded-3xl h-24 pl-2 w-full">
          <div className="flex items-center gap-5">
            <Avatar
              size="h-20 w-20"
              username={user.username}
              avatarId={user.avatar_id}
              status={user.status}
            ></Avatar>
            <h2 className="font-semibold text-lg">{user.username}</h2>
          </div>
          <div className="flex flex-col justify-center gap-1.5 h-full pr-3">
            <button className="group">
              <Add
                className="ease-in-out duration-300 fill-gray group-hover:fill-violet"
                onClick={() => {
                  unblock(user.id)
                }}
                title="Unblock User"
              />
            </button>
          </div>
        </div>
      </div>
    )
  }
  return (
    <SocialItemContainer title="Blocked">
      <SocialItemList>
        {!blocked ? (
          <Spinner center />
        ) : !blockedUsrs || !blockedUsrs.length ? (
          <SocialNoItem msg="You didn't block anyone, great!!" />
        ) : (
          <>{blockedUsrs.map(renderBlocked)}</>
        )}
      </SocialItemList>
    </SocialItemContainer>
  )
}
