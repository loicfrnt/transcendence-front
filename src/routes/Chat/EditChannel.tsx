import { ProtoChannel } from '../../types/chat'
import chatServices from '../../services/chat.service'

interface Props {
  channelId: number
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  setChannels: React.Dispatch<React.SetStateAction<ProtoChannel[]>>
}
export default function EditChannel({
  channelId,
  setOpen,
  setChannels,
}: Props) {
  return (
    <div>
      <h1 className="font-semibold text-xl mb-3">Edit Channel</h1>
      <button
        onClick={() => {
          chatServices.deleteChannel(channelId, setChannels)
          setOpen(false)
        }}
      >
        Delete Channel
      </button>
    </div>
  )
}
