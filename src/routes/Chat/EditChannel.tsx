import { Channel } from '../../types/chat'
import chatServices from '../../services/chat.service'

interface Props {
  channelId: number
  setChannels: React.Dispatch<React.SetStateAction<Channel[]>>
}
export default function EditChannel({ channelId, setChannels }: Props) {
  return (
    <div>
      <h1 className="font-semibold text-xl mb-3">Edit Channel</h1>
      <button
        onClick={() => chatServices.deleteChannel(channelId, setChannels)}
      >
        Delete Channel
      </button>
    </div>
  )
}
