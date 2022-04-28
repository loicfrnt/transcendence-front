import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  FormikState,
  useFormikContext,
} from 'formik'
import chatService from '../../services/chat.service'
import { NewChannel, ProtoChannel } from '../../types/chat'
import * as Yup from 'yup'

interface Props {
  setChannels: React.Dispatch<React.SetStateAction<ProtoChannel[]>>
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CreateChannel({ setChannels, setIsOpen }: Props) {
  function handleSubmit(
    values: NewChannel,
    {
      resetForm,
    }: { resetForm: (nextState?: Partial<FormikState<NewChannel>>) => void }
  ) {
    if (values.status === 'public') values.password = ''
    console.log(values)
    chatService.createChannel(values, setChannels)
    setIsOpen(false)
    resetForm()
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3, 'Too short !').max(20, 'Too long UwU'),
  })

  function ChannelPassword() {
    const { values }: { values: NewChannel } = useFormikContext()
    const isHidden = values.status === 'public'
    return (
      <Field
        disabled={isHidden}
        type="password"
        name="password"
        placeholder="Channel Password"
        className={'rounded-xl' + (isHidden ? ' hidden' : '')}
      />
    )
  }

  return (
    <div>
      <h1 className="font-semibold text-xl mb-3">Create Channel</h1>
      <Formik
        initialValues={{ name: '', status: 'public', password: '' }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form className="flex flex-col gap-3 duration-75" autoComplete="off">
          <Field
            type="text"
            name="name"
            placeholder="Channel Name"
            className="rounded-xl"
          />
          <ErrorMessage name="name" component="div" className="text-red" />
          <Field as="select" name="status" className="rounded-xl">
            <option value="public"> Public </option>
            <option value="private"> Private </option>
          </Field>
          <ChannelPassword />
          <button
            type="submit"
            className="bg-gray-light font-semibold text-lg w-fit self-center mt-1 px-2 py-1 rounded-xl border hover:text-white hover:bg-violet duration-300"
          >
            Create
          </button>
        </Form>
      </Formik>
    </div>
  )
}
