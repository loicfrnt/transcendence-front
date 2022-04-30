import { useEffect } from 'react'
import { useState } from 'react'
import { Socket } from 'socket.io-client'
import chatService from '../../services/chat.service'
import { ProtoChannel } from '../../types/chat'
import { ReactComponent as ReloadSvg } from '../../assets/reload.svg'
import { ReactComponent as ProtectedSvg } from '../../assets/protected.svg'
import { ReactComponent as ArrowSvg } from '../../assets/arrow.svg'
import { Field, Form, Formik, FormikState } from 'formik'

interface RenderChannelProps {
  setChannels: React.Dispatch<React.SetStateAction<ProtoChannel[]>>
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  socket: Socket | null
  channel: ProtoChannel
}

function RenderChannel({
  setChannels,
  setIsOpen,
  socket,
  channel,
}: RenderChannelProps) {
  const [showPwd, setShowPwd] = useState(false)
  const classButton =
    'duration-300 ease-in-out rounded-3xl h-12 px-5 w-full flex justify-between items-center bg-gray-light hover:bg-violet-light gap-4'
  console.log(showPwd)

  interface FormValue {
    password: string
  }
  interface ResetForm {
    resetForm: (nextState?: Partial<FormikState<FormValue>>) => void
  }

  function submitPassword(values: FormValue, { resetForm }: ResetForm) {
    console.log('yooo le s')
    socket?.emit(
      'join_channel',
      { id: channel.id.toString(), password: values.password },
      () => {
        chatService.getChannels(setChannels)
        setIsOpen(false)
      }
    )
  }
  //Protected Channel
  if (channel.status === 'protected') {
    const display = showPwd ? '' : 'hidden'
    return (
      <div
        className={
          'duration-300 rounded-3xl h-fit px-5 flex flex-col bg-gray-light hover:bg-violet-light' +
          (showPwd ? ' bg-violet-light' : '')
        }
        onClick={(e) => {
          setShowPwd(!showPwd)
        }}
      >
        <div className="flex h-12 w-full justify-between items-center gap-4">
          <h2 className="font-semibold text-xl">{channel.name}</h2>
          <ProtectedSvg className="w-9" />
        </div>
        <Formik initialValues={{ password: '' }} onSubmit={submitPassword}>
          <Form
            onClick={(e) => e.stopPropagation()}
            autoComplete="off"
            className={
              'duration-300 ease-in-out flex gap-5 overflow-hidden w-full justify-between ' +
              (showPwd ? 'h-7 mb-2' : 'h-0')
            }
          >
            <Field
              type="password"
              name="password"
              placeholder="Channel Password"
              className={`rounded-xl text-xs ${display}`}
            />
            <div
              className={`flex justify-center items-center h-full w-9 ${display}`}
            >
              <button type="submit">
                <ArrowSvg className="w-5 fill-violet" />
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    )
  }
  // Public channel
  else
    return (
      <div
        className={classButton}
        onClick={(e) => {
          socket?.emit('join_channel', { id: channel.id.toString() }, () => {
            chatService.getChannels(setChannels)
            setIsOpen(false)
          })
        }}
      >
        <h2 className="font-semibold text-xl">{channel.name}</h2>
      </div>
    )
}

interface JoinChannelProps {
  setChannels: React.Dispatch<React.SetStateAction<ProtoChannel[]>>
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  socket: Socket | null
}

export default function JoinChannel({
  setChannels,
  setIsOpen,
  socket,
}: JoinChannelProps) {
  const [joinChannels, setJoinChannels] = useState<ProtoChannel[]>([])

  useEffect(() => {
    chatService.getJoinableChannels(setJoinChannels)
  }, [])

  // function join(channel: ProtoChannel) {}
  return (
    <div className="min-w-[250px]">
      <div className="flex mb-3 gap-2 items-center">
        <h1 className="font-semibold text-2xl">Join Channel</h1>
        <ReloadSvg
          className="w-6 h-6 fill-gray hover:fill-violet duration-300"
          onClick={(e) => chatService.getJoinableChannels(setJoinChannels)}
          cursor={'pointer'}
        />
      </div>
      <div className="flex flex-col gap-1 overflow-hidden hover:overflow-auto max-h-[300px]">
        {joinChannels.length
          ? joinChannels.map((channel) => (
              <RenderChannel
                setChannels={setChannels}
                setIsOpen={setIsOpen}
                socket={socket}
                channel={channel}
                key={channel.id}
              />
            ))
          : 'No Channels to be joined :c'}
      </div>
    </div>
  )
}
