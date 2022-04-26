import { Field, Form, Formik } from 'formik'

export default function CreateChannel() {
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
          <Field
            type="password"
            name="password"
            placeholder="Channel Password"
            className="rounded-xl"
          />
        </Form>
      </Formik>
    </div>
  )
}
