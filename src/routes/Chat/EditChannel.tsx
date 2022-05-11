import { Channel, NewChannel, ProtoChannel } from '../../types/chat'
import chatServices from '../../services/chat.service'
import FormikChannel from './FormikChannel'
import chatService from '../../services/chat.service'
import * as Yup from 'yup'

interface Props {
  channel: Channel
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  setChannel: React.Dispatch<React.SetStateAction<Channel | undefined>>
  setChannels: React.Dispatch<React.SetStateAction<ProtoChannel[]>>
}

export default function EditChannel({
  channel,
  setOpen,
  setChannel,
  setChannels,
}: Props) {
  function handleSubmit(values: NewChannel) {
    if (values.status === 'public') values.password = ''
    chatService.patchChannel(channel, values, setChannel, setChannels)
  }

  function handleDelete() {
    if (window.confirm(`You're about to delete this channel. Are you sure ?`)) {
      chatServices.deleteChannel(channel.id)
      setOpen(false)
    }
  }

  let validationSchema: any
  // make password required if channel didn't have one before
  if (channel.status !== 'protected')
    validationSchema = Yup.object().shape({
      name: Yup.string()
        .required('A name is needed')
        .min(3, 'Too short !')
        .max(20, 'Too long UwU'),
      password: Yup.string()
        .min(7, 'Too short !')
        .when('status', {
          is: 'protected',
          then: Yup.string().required(
            'Password needed when switching to protected'
          ),
        }),
    })
  else
    validationSchema = Yup.object().shape({
      name: Yup.string()
        .required('A name is needed')
        .min(3, 'Too short !')
        .max(20, 'Too long UwU'),
      password: Yup.string().min(7, 'Too short !'),
    })

  return (
    <div className="flex flex-col">
      <h1 className="font-semibold text-xl mb-3">Edit Channel</h1>
      <FormikChannel
        submitButtonString="Save Changes"
        initialValues={{
          name: channel.name,
          password: '',
          status: channel.status,
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
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
