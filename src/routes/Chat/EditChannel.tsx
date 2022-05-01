import { Channel, NewChannel, ProtoChannel } from '../../types/chat'
import chatServices from '../../services/chat.service'
import FormikChannel from './FormikChannel'
import chatService from '../../services/chat.service'

interface Props {
  channel: Channel
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  setChannels: React.Dispatch<React.SetStateAction<ProtoChannel[]>>
}

export default function EditChannel({ channel, setOpen, setChannels }: Props) {
  function handleSubmit(values: NewChannel) {
    if (values.status === 'public') values.password = ''
    console.log(values)
    chatService.patchChannel(channel.id, values, setChannels)
  }

  function handleDelete() {
    if (window.confirm(`You're about to delete this channel. Are you sure ?`)) {
      chatServices.deleteChannel(channel.id, setChannels)
      setOpen(false)
    }
  }

  return (
    <div className="flex flex-col">
      <h1 className="font-semibold text-xl mb-3">Edit Channel</h1>
      <FormikChannel
        initialValues={{
          name: channel.name,
          password: '',
          status: channel.status,
        }}
        onSubmit={handleSubmit}
      />
      <button
        className="bg-gray-light font-semibold text-lg w-fit self-center mt-1 px-2 py-1 rounded-xl border hover:text-white hover:bg-red duration-300 ease-in-out"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  )
}
