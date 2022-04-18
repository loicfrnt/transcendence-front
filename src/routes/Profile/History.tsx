import { userInfo } from 'os'
import Avatar from '../../components/Avatar'
import ContentBox from '../../components/ContentBox'
import { User } from '../../types/user'

interface Props {
  user: User
}

export default function History({ user }: Props) {
  function renderFriend(user: User, id: number) {
    return (
      <div key={id}>
        <div className="bg-gray-light rounded-3xl h-24 pl-2 w-full flex items-center gap-5">
          <Avatar
            noLink
            size="h-20 w-20"
            username={user.username}
            avatarId={user.avatarId}
          ></Avatar>
          <h2 className="font-semibold text-lg">{user.username}</h2>
        </div>
      </div>
    )
  }
  return (
    <ContentBox className="w-[400px] flex flex-col  pt-3 px-6 grid-item mb-10 max-h-[75vh]">
      <h1 className={'mb-4 text-[2rem] leading-[2.625rem] font-semibold'}>
        Friends
      </h1>
      <div className="duration-300 overflow-hidden hover:overflow-auto flex flex-col gap-3 pr-0 scrollbar"></div>
    </ContentBox>
  )
}
