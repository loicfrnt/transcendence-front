import { Link } from 'react-router-dom'
import Avatar from '../../components/Avatar'
import { User } from '../../types/user'
import SocialItemContainer from './SocialItemContainer'
import SocialItemList from './SocialItemList'
import SocialNoItem from './SocialNoItem'
import { ReactComponent as Accept } from '../../assets/accept.svg'
import { ReactComponent as Reject } from '../../assets/reject.svg'

interface Props {
  requests: User[]
}

export default function FriendRequests({ requests }: Props) {
  const svgClass = 'ease-in-out duration-300 fill-gray group-hover:fill-violet'

  function renderRequest(user: User, id: number) {
    return (
      <div key={id}>
        <div className="flex justify-between bg-gray-light rounded-3xl h-24 pl-2 w-full ">
          <div className="flex items-center gap-5">
            <Avatar
              noLink
              size="h-20 w-20"
              username={user.username}
              avatarId={user.avatarId}
            ></Avatar>
            <h2 className="font-semibold text-lg">{user.username}</h2>
          </div>
          <div className="flex flex-col justify-center gap-1.5 h-full pr-3">
            <button className="group">
              <Accept className={svgClass} />
            </button>
            <button className="group">
              <Reject className={svgClass} />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <SocialItemContainer title="Friend Requests">
      {!requests ? (
        <SocialNoItem msg="No requests.. (yet!)" />
      ) : (
        <SocialItemList>
          <>{requests.map(renderRequest)}</>
        </SocialItemList>
      )}
    </SocialItemContainer>
  )
}
