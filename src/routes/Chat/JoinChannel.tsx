import { useEffect } from 'react'
import { useState } from 'react'
import { Socket } from 'socket.io-client'
import chatService from '../../services/chat.service'
import { ProtoChannel } from '../../types/chat'

interface Props {
  setChannels: React.Dispatch<React.SetStateAction<ProtoChannel[]>>
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  socket: Socket | null
}

export default function JoinChannel({ setChannels, setIsOpen, socket }: Props) {
  const [joinChannels, setJoinChannels] = useState<ProtoChannel[]>([])

  useEffect(() => {
    chatService.getJoinableChannels(setJoinChannels)
  }, [])

  // function join(channel: ProtoChannel) {}

  function renderChannel(channel: ProtoChannel) {
    return (
      <div key={channel.id}>
        <button
          className="duration-300 rounded-3xl h-16 pl-5 w-full flex items-center bg-gray-light hover:bg-violet-light"
          onClick={(e) => {
            socket?.emit('join_channel', { id: channel.id.toString() }, () => {
              chatService.getChannels(setChannels)
            })
          }}
        >
          <h2 className="font-semibold text-xl">{channel.name}</h2>
        </button>
      </div>
    )
  }
  return (
    <div>
      <h1 className="font-semibold text-xl mb-3">Join Channel</h1>
      <div className="flex flex-col gap-1">
        {joinChannels.length
          ? joinChannels.map(renderChannel)
          : 'No Channels to be joined :c'}
      </div>
    </div>
  )
}
