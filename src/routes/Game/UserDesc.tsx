import { User } from '../../types/user'
import Avatar from '../../components/Avatar'
import ContentBox from '../../components/ContentBox'

interface Props {
  user: User
  role: string
}

export default function UserDesc({ user, role }: Props) {
  function ratio(victories: number, defeats: number): number {
    if (!defeats) {
      return victories ? 1 : 0
    }
    return victories / defeats
  }

  const titleStyle = 'text-[2rem] leading-[2.625rem] font-semibold '
  const statsStyle = 'text-[1.375rem] leading-[2.625rem] font-normal'

  return (
    <ContentBox className="text-center pt-[6px] w-[255px] flex flex-col items-center">
      <h2 className={titleStyle + 'mb-[18px]'}>{role}</h2>
      <Avatar
        username={user.username}
        avatarId={user.avatarId}
        size="h-[173px] w-[173px]"
      />
      <h2 className={titleStyle + 'mt-[5px]'}>{user.username}</h2>
      <div className={statsStyle}>{user.victories} Wins</div>
      <div className={statsStyle}>{user.defeats} Loses</div>
      <div className={statsStyle}>
        {ratio(user.victories, user.defeats)} Ratio
      </div>
    </ContentBox>
  )
}