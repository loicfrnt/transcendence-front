import { useEffect, useRef } from 'react'
import { useState } from 'react'
import { Socket } from 'socket.io-client'
import chatService from '../../services/chat.service'
import { ProtoChannel } from '../../types/chat'
import { ReactComponent as ReloadSvg } from '../../assets/reload.svg'
import { ReactComponent as ProtectedSvg } from '../../assets/protected.svg'
import { ReactComponent as ArrowSvg } from '../../assets/arrow.svg'
import { Field, Form, Formik, FormikState } from 'formik'
import animateCSS from '../../utils/animateCSS'
import 'animate.css'
import { useNavigate } from 'react-router-dom'

interface RenderChannelProps {
  setChannels: React.Dispatch<React.SetStateAction<ProtoChannel[]>>
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  socket: Socket
  channel: ProtoChannel
}

function RenderChannel({
  setChannels,
  setIsOpen,
  socket,
  channel,
}: RenderChannelProps) {
  const [showPwd, setShowPwd] = useState(false)
  const pwdFieldElement = useRef<HTMLElement>(null)
  let navigate = useNavigate()

  interface FormValue {
    password: string
  }
  interface ResetForm {
    resetForm: (nextState?: Partial<FormikState<FormValue>>) => void
  }

  function submitPassword(values: FormValue, { resetForm }: ResetForm) {
    socket.emit(
      'join_channel',
      { id: channel.id.toString(), password: values.password },
      (data: any) => {
        if (!data.error) {
          setChannels((channels) => {
            let newChannels = [...channels]
            newChannels.push(data as ProtoChannel)
            return newChannels
          })
          setIsOpen(false)
          setIsOpen(false)
          resetForm()
          navigate(`/chat/` + data.id)
        } else if (data.error.name === 'PasswordErrorException') {
          pwdFieldElement.current &&
            animateCSS(pwdFieldElement.current, 'headShake')
        } else {
          console.log(data.error.message)
        }
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
              'duration-300 ease-in-out flex gap-5 w-full justify-between ' +
              (showPwd ? 'h-7 mb-2' : 'h-0')
            }
          >
            <Field
              type="password"
              name="password"
              placeholder="Channel Password"
              className={`rounded-xl text-xs ${display} animate__faster`}
              innerRef={pwdFieldElement}
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
        className="duration-300 ease-in-out rounded-3xl min-h-[3rem] px-5 w-full flex justify-between items-center bg-gray-light hover:bg-violet-light gap-4"
        style={{ cursor: 'pointer' }}
        onClick={(e) => {
          socket.emit(
            'join_channel',
            { id: channel.id.toString() },
            (data: any) => {
              setChannels((channels) => {
                let newChannels = [...channels]
                newChannels.push(data as ProtoChannel)
                return newChannels
              })
              navigate(`/chat/` + data.id)
              setIsOpen(false)
            }
          )
        }}
      >
        <h2 className="font-semibold text-xl">{channel.name}</h2>
      </div>
    )
}

interface JoinChannelProps {
  setChannels: React.Dispatch<React.SetStateAction<ProtoChannel[]>>
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  socket: Socket
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
          ? joinChannels
              .sort((a, b) => {
                let d1 = Date.parse(a.last_message_at)
                let d2 = Date.parse(b.last_message_at)
                return d2 - d1
              })
              .map((channel) => (
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
