import Avatar from '../../components/Avatar'
import { Message } from '../../types/chat'
import { User } from '../../types/user'

interface Props {
  thisUser: User
  messages: Message[]
}

export default function Conversation({ thisUser, messages }: Props) {
  function renderMessage(message: Message) {
    const align = message.author === thisUser ? 'self-end' : ''
    const color =
      message.author === thisUser ? 'bg-violet-light' : 'bg-gray-light'

    function avatar() {
      if (message.author !== thisUser) {
        return (
          <Avatar
            avatarId={message.author.avatarId}
            username={message.author.username}
            size={'h-7 w-7 mt-1.5 mr-1.5'}
          />
        )
      }
      return <></>
    }
    return (
      <div className={`flex w-fit max-w-[66%] ${align}`} key={message.id}>
        {avatar()}
        <div className={`${color} px-2 py-1.5 rounded-2xl`}>
          <p className="text-lg break-word">{message.content}</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col min-h-[60vh] max-h-[70vh] gap-4 overflow-auto">
        {messages.map(renderMessage)}
      </div>
      <input
        className="bg-gray-light align w-full rounded-2xl px-2 py-1.5"
        type="text"
        placeholder="Aa"
      />
    </>
  )
}
