import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  FormikHelpers,
  FormikState,
  useFormikContext,
} from 'formik'
import { NewChannel } from '../../types/chat'

interface Props {
  submitButtonString: string
  initialValues: NewChannel
  onSubmit: ((
    values: NewChannel,
    formikHelpers: FormikHelpers<NewChannel>
  ) => void | Promise<any>) &
    ((values: NewChannel, { resetForm }: ResetForm) => void)
  validationSchema: any
}

export interface ResetForm {
  resetForm: (nextState?: Partial<FormikState<NewChannel>>) => void
}

export default function FormikChannel({
  submitButtonString,
  initialValues,
  onSubmit,
  validationSchema,
}: Props) {
  function ChannelPassword() {
    const { values }: { values: NewChannel } = useFormikContext()
    const isHidden = values.status !== 'protected'
    if (isHidden) {
      return null
    } else {
      return (
        <>
          <ErrorMessage name="password" component="div" className="text-red" />
          <Field
            disabled={isHidden}
            type="password"
            name="password"
            placeholder={'Channel Password'}
            className={'rounded-xl' + (isHidden ? ' hidden' : '')}
          />
        </>
      )
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      enableReinitialize
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
          <option value="protected"> Protected </option>
          <option value="private"> Private </option>
        </Field>
        <ChannelPassword />
        <button
          type="submit"
          className="bg-gray-light font-semibold text-lg w-fit self-center mt-1 px-2 py-1 rounded-xl border hover:text-white hover:bg-violet duration-300 ease-in-out"
        >
          {submitButtonString}
        </button>
      </Form>
    </Formik>
  )
}
