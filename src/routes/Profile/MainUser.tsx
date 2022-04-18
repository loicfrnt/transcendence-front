import Avatar from '../../components/Avatar'
import ContentBox from '../../components/ContentBox'
import ratio from '../../utils/ratio'
import { User } from '../../types/user'

interface MyProps {
  user: User
  children?: React.ReactNode
}

export default function MainUser({ user, children }: MyProps) {
  const titleStyle = 'text-[2rem] leading-[2.625rem] font-semibold '
  const statsStyle = 'text-[1.375rem] leading-[2.625rem] font-normal'

  return (
    <ContentBox className="w-[400px] flex flex-col items-center py-7 grid-item">
      <Avatar
        username={user.username}
        avatarId={user.avatarId}
        size="h-[316px] w-[316px]"
        noLink
      />
      <h2 className={titleStyle + 'mt-5'}>{user.username}</h2>
      <div className="w-full flex justify-evenly mt-2">
        <div className={statsStyle}>{user.victories} Wins</div>
        <div className={statsStyle}>{user.defeats} Loses</div>
        <div className={statsStyle}>
          {ratio(user.victories, user.defeats)} Ratio
        </div>
      </div>
      <div className="flex w-full justify-around flex-wrap mt-5 gap-y-4">
        {children}
      </div>
    </ContentBox>
  )
}
