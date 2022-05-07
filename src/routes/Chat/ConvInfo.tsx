import ContentBox from '../../components/ContentBox'
import { Channel } from '../../types/chat'
import { User } from '../../types/user'
import { ConvInfoChannel } from './ConvInfoChannel'
import ConvInfoDm from './ConvInfoDm'

interface Props {
  channel: Channel
  thisUser: User
}

export default function ConvInfo({ channel, thisUser }: Props) {
  if (channel.status !== 'direct_message')
    return (
      <ContentBox className="w-[400px] pt-5">
        <ConvInfoChannel channel={channel} thisUser={thisUser} />
      </ContentBox>
    )
  else
    return (
      <ContentBox className="w-[400px] pt-5">
        <ConvInfoDm channel={channel} thisUser={thisUser} />
      </ContentBox>
    )
}
