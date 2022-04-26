import { Field, Form, Formik, useFormikContext } from 'formik'
import { NewChannel } from '../../types/chat'

export default function CreateChannel() {
  function ChannelPassword() {
    const { values }: { values: NewChannel } = useFormikContext()
    const isHidden = values.status === 'public'
    return (
      <Field
        disabled={isHidden}
        autocomplete="off"
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
        onSubmit={(values) => {}}
      >
        <Form className="flex flex-col gap-3">
          <Field
            type="text"
            name="name"
            placeholder="Channel Name"
            className="rounded-xl"
          />
          <Field as="select" name="status" className="rounded-xl">
            <option value="public"> Public </option>
            <option value="private"> Private </option>
          </Field>
          <ChannelPassword />
        </Form>
      </Formik>
    </div>
  )
}
