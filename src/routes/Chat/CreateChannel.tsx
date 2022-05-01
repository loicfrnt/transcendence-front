import chatService from '../../services/chat.service'
import { NewChannel, ProtoChannel } from '../../types/chat'
import FormikChannel, { ResetForm } from './FormikChannel'
import * as Yup from 'yup'

interface Props {
  setChannels: React.Dispatch<React.SetStateAction<ProtoChannel[]>>
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CreateChannel({ setChannels, setIsOpen }: Props) {
  function handleSubmit(values: NewChannel, { resetForm }: ResetForm) {
    if (values.status === 'public') values.password = ''
    console.log(values)
    chatService.createChannel(values, setChannels)
    setIsOpen(false)
    resetForm()
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('A name is needed')
      .min(3, 'Too short !')
      .max(20, 'Too long UwU'),
    password: Yup.string()
      .min(7, 'Too short !')
      .when('status', {
        is: 'protected',
        then: Yup.string().required('Password is needed'),
      }),
  })

  return (
    <div className="min-w-[200px] duration-75">
      <h1 className="font-semibold text-2xl mb-3">Create Channel</h1>
      <FormikChannel
        submitButtonString="Create"
        initialValues={{ name: '', status: 'public', password: '' }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      />
    </div>
  )
}
