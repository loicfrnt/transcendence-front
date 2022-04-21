import { useParams } from 'react-router-dom'
import ContentBox from '../../components/ContentBox'
import { User } from '../../types/user'
import channelName from '../../utils/channelName'
import Conversation from './Conversation'

interface Props {
  thisUser: User
}

export default function ChatOpen({ thisUser }: Props) {
  const channels = thisUser.channels
  const params = useParams()
  const channelId = parseInt(params.channelId as string)
  const channel = channels.find((c) => c.id === channelId)

  if (channel === undefined) {
    return (
      <ContentBox className="w-[400px] sm:max-w-[836px] sm:grow">
        <h1 className="font-semibold text-lg text-center">
          Channel not found..
        </h1>
      </ContentBox>
    )
  }

  return (
    <>
      <ContentBox className="w-[400px] sm:max-w-[836px] sm:grow">
        <h1 className={'mb-4 text-[2rem] leading-[2.625rem] font-semibold'}>
          {channelName(channel, thisUser)}
        </h1>
        <Conversation messages={channel.messages} thisUser={thisUser} />
      </ContentBox>
      <ContentBox className="w-[400px]"></ContentBox>
    </>
  )
}
