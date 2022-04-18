import { Link } from 'react-router-dom'
import Avatar from '../../components/Avatar'
import ContentBox from '../../components/ContentBox'
import { userList } from '../../data/users'
import { User } from '../../types/user'

export default function Friends() {
  function renderFriend(user: User, id: number) {
    return (
      <div key={id}>
        <Link
          to={'/profile/' + user.username}
          className="bg-gray-light rounded-3xl h-24 pl-2 w-full flex items-center gap-5"
        >
          <Avatar
            noLink
            size="h-20 w-20"
            username={user.username}
            avatarId={user.avatarId}
          ></Avatar>
          <h2 className="font-semibold text-lg">{user.username}</h2>
        </Link>
      </div>
    )
  }

  const border = userList.length > 5 ? ' border-y border-gray' : ''

  return (
    <ContentBox className="w-[400px] flex flex-col  pt-3 px-6 grid-item mb-10 max-h-[75vh]">
      <h1 className={'mb-4 text-[2rem] leading-[2.625rem] font-semibold'}>
        Friends
      </h1>
      <div
        className={
          'overflow-hidden hover:overflow-auto flex flex-col gap-3 pr-0' +
          border
        }
      >
        {userList.map((user, id) => renderFriend(user, id))}
      </div>
    </ContentBox>
  )
}
