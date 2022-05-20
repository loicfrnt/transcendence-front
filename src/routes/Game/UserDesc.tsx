import { User } from '../../types/user'
import Avatar from '../../components/Avatar'
import ContentBox from '../../components/ContentBox'
import { ReactElement } from 'react'
import ratio from '../../utils/ratio'

interface Props {
  user: User
  role: string
  children?: ReactElement
}

export default function UserDesc({ user, role, children }: Props) {
  const titleStyle =
    'text-[2rem] leading-[2.625rem] font-semibold break-words w-full '
  const statsStyle = 'text-[1.375rem] leading-[2.625rem] font-normal'

  return (
    <ContentBox className="text-center pt-[6px] w-[255px] flex flex-col items-center">
      <h2 className={titleStyle + 'mb-[18px]'}>{role}</h2>
      <Avatar
        username={user.username}
        avatarId={user.avatar_id}
        size="w-[173px]"
        status={user.status}
      />
      <h2 className={titleStyle + 'mt-[5px]'}>{user.username}</h2>
      <div className={statsStyle}>{user.victories} Wins</div>
      <div className={statsStyle}>{user.defeats} Loses</div>
      <div className={statsStyle} title="Winrate">
        {ratio(user.victories, user.defeats)}%
      </div>
      {children}
    </ContentBox>
  )
}
