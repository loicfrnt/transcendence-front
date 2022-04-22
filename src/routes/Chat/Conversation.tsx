import { createRef, useRef } from 'react'
import { useEffect } from 'react'
import Avatar from '../../components/Avatar'
import { Message } from '../../types/chat'
import { User } from '../../types/user'

interface Props {
  thisUser: User
  messages: Message[]
}

export default function Conversation({ thisUser, messages }: Props) {
  //Scroll conversation to bottom on each load + new message
  let convRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const conv = convRef.current as HTMLDivElement
    console.log(conv)
    conv.scrollTop = conv.scrollHeight
  }, [messages])

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
      <div
        id="conversation"
        ref={convRef}
        className="flex flex-col min-h-[60vh] max-h-[70vh] gap-4 overflow-auto"
      >
        {messages.map(renderMessage)}
      </div>
      <input
        className="bg-gray-light align w-full rounded-2xl px-2 py-1.5 mt-3"
        type="text"
        placeholder="Aa"
      />
    </>
  )
}
