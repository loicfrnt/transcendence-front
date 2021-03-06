import { KeyboardEvent } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { Socket } from 'socket.io-client'
import Avatar from '../../components/Avatar'
import { Message } from '../../types/chat'
import { User } from '../../types/user'
import isBlocked from '../../utils/isBlocked'

interface Props {
  currUser: User
  messages: Message[]
  channelId: number
  socket: Socket
}

export default function Conversation({
  currUser,
  messages,
  channelId,
  socket,
}: Props) {
  //Scroll conversation to bottom on each load + new message
  let convRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const conv = convRef.current as HTMLDivElement
    conv.scrollTop = conv.scrollHeight
  }, [messages.length])

  function renderMessage(message: Message) {
    const align = message.author.id === currUser.id ? 'self-end' : ''
    const blocked = isBlocked(currUser, message.author)
    const textColor = blocked ? 'text-gray-200' : ''
    const avatarOpacity = blocked ? 'opacity-50' : ''
    const color = blocked
      ? 'bg-gray-50'
      : message.author.id === currUser.id
      ? 'bg-violet-light'
      : 'bg-gray-light'

    function avatar() {
      if (message.author.id !== currUser.id) {
        return (
          <Avatar
            avatarId={message.author.avatar_id}
            username={message.author.username}
            size={`h-7 w-7 mt-1.5 mr-1.5 ${avatarOpacity}`}
            status={message.author.status}
          />
        )
      }
      return <></>
    }
    return (
      <div className={`flex w-fit max-w-[66%] ${align}`} key={message.id}>
        {avatar()}
        <div className={`${color} px-2 py-1.5 rounded-2xl`}>
          <p className={`${textColor} text-lg break-word`}>
            {blocked ? 'You blocked this user' : message.content}
          </p>
        </div>
      </div>
    )
  }

  const handleSend = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      socket.emit('send_channel_message', {
        channelId: channelId,
        content: (e.target as HTMLInputElement).value,
      })
      ;(e.target as HTMLInputElement).value = ''
    }
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
        onKeyDown={handleSend}
        className="bg-gray-light align w-full rounded-2xl px-2 py-1.5 mt-3"
        type="text"
        placeholder="Aa"
      />
    </>
  )
}
