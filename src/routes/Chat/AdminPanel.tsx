import { Field, Form, Formik } from 'formik'
import { Socket } from 'socket.io-client'
import Avatar from '../../components/Avatar'
import { ChannelUser } from '../../types/chat'

interface SanctionFormProps {
  cUser: ChannelUser
  socket: Socket
}

interface FormValues {
  type: string
  duration: string
}

function SanctionForm({ cUser, socket }: SanctionFormProps) {
  const getEndOfSanction = (duration: string) => {
    const getDurationMs = (duration: string) => {
      switch (duration) {
        case '24h':
          return 24 * 60
        case '1h':
          return 60
        case '15mn':
          return 15
        default:
        case '1mn':
          return 1
      }
    }
    return new Date(Date.now() + 60000 * getDurationMs(duration)).toISOString()
  }

  const onSubmit = ({ type, duration }: FormValues) => {
    socket.emit(
      'manage_channel_user',
      {
        id: cUser.id,
        sanction: type,
        end_of_sanction: duration === 'def' ? null : getEndOfSanction(duration),
      },
      (rep: any) => console.log(rep)
    )
  }

  return (
    <Formik
      initialValues={{ type: 'mute', duration: '1mn' }}
      onSubmit={onSubmit}
      enableReinitialize
    >
      <Form className="flex flex-col gap-2 items-center">
        <Field as="select" name="type" className="rounded-xl w-fit">
          <option value="mute"> Mute </option>
          <option value="ban"> Ban </option>
        </Field>
        <Field as="select" name="duration" className="rounded-xl w-fit">
          <option value="1mn"> 1 minute </option>
          <option value="15mn"> 15 minutes </option>
          <option value="1h"> 1 hour </option>
          <option value="24h"> 1 day </option>
          <option value="def"> Definitive </option>
        </Field>
        <button
          type="submit"
          className="bg-gray-light font-semibold text-lg w-fit self-center mt-1 px-2 py-1 rounded-xl border hover:text-white hover:bg-red duration-300 ease-in-out"
        >
          Apply
        </button>
      </Form>
    </Formik>
  )
}

interface Props {
  cUser: ChannelUser
  socket: Socket
}

export default function AdminPanel({ cUser, socket }: Props) {
  const user = cUser.user
  const isAdmin = cUser.role === 2
  const titleStyle = 'font-semibold text-lg ml-2'
  return (
    <div className="flex flex-col gap-5 min-w-[300px] items-center">
      <div className="flex">
        <Avatar
          avatarId={user.avatar_id}
          username={user.username}
          size="h-8 w-8"
          status = {user.status}
        />
        <h2 className="font-semibold text-xl ml-2">{user.username}</h2>
      </div>
      <div className="flex gap-2">
        <button
          className={
            `font-semibold rounded-full bg-gray-light p-3  hover:text-white duration-300 ease-in-out ` +
            (isAdmin ? 'hover:bg-red' : 'hover:bg-violet')
          }
          onClick={() =>
            socket.emit(
              'manage_channel_user',
              {
                id: cUser.id,
                role: isAdmin ? 1 : 2,
              },
              (rep: any) => console.log(rep)
            )
          }
        >
          {isAdmin ? 'Revoke Admin' : 'Make Admin'}
        </button>
        {cUser.sanction && (
          <button
            className={`font-semibold rounded-full bg-gray-light p-3  hover:text-white duration-300 ease-in-out hover:bg-violet`}
            onClick={() =>
              socket.emit(
                'manage_channel_user',
                {
                  id: cUser.id,
                  sanction: null,
                },
                (rep: any) => console.log(rep)
              )
            }
          >
            Purge Sanction
          </button>
        )}
      </div>
      <div className="flex flex-col items-center">
        <h2 className="font-semibold text-xl mb-2">Sanction</h2>
        <SanctionForm cUser={cUser} socket={socket} />
      </div>
    </div>
  )
}
