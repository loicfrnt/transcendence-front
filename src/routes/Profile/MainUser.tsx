import Avatar from '../../components/Avatar'
import ContentBox from '../../components/ContentBox'
import ratio from '../../utils/ratio'
import { User } from '../../types/user'

interface MyProps {
  user: User
  children?: React.ReactNode
  currUser?: boolean
  setCurrUser?: React.Dispatch<React.SetStateAction<User>> | null
}

export default function MainUser({
  user,
  children,
  currUser = false,
  setCurrUser = null,
}: MyProps) {
  const titleStyle = 'text-[2rem] leading-[2.625rem] font-semibold '
  const statsStyle =
    'text-[1.375rem] leading-[2.625rem] font-normal text-center'

  return (
    <ContentBox className="max-w-[400px] flex flex-col items-center py-7 grid-item mb-10">
      <Avatar
        username={user?.username}
        avatarId={user?.avatar_id}
        size="max-h-[316px] max-w-[316px] w-full"
        status={user?.status}
        currUser={currUser}
        setCurrUser={setCurrUser}
        noLink
      />
      <h2 className={titleStyle + 'mt-5'}>{user?.username}</h2>
      <div className="w-full flex justify-evenly mt-2">
        <div className={statsStyle}>{user?.victories} Wins</div>
        <div className={statsStyle}>{user?.defeats} Loses</div>
        <div className={statsStyle} title="Winrate">
          {ratio(user?.victories, user?.defeats)}%
        </div>
      </div>
      <div className="flex w-full justify-around flex-wrap mt-5 gap-y-4">
        {children}
      </div>
    </ContentBox>
  )
}
