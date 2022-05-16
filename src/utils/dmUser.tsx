import { NavigateFunction } from 'react-router-dom'
import { Socket } from 'socket.io-client'
import { ProtoChannel } from '../types/chat'
import { User } from '../types/user'

// Only provide setChannels if we're in Chat component already
// Used to refresh the Channels list, needed so that the navigation
// dosen't fail (there's a isChannelInList? check before render)
export default function dmUser(
  user: User,
  socket: Socket,
  navigate: NavigateFunction,
  setChannels: React.Dispatch<
    React.SetStateAction<ProtoChannel[]>
  > | null = null
): void {
  socket.emit(
    'get_direct_messages_channel',
    { id: user.id.toString() },
    (channel: any, err: any) => {
      console.log(channel, err)
      if (setChannels) {
        setChannels((channels) => {
          if (undefined === channels.find((chan) => chan.id === channel.id)) {
            let newChannels = [...channels]
            newChannels.push(channel as ProtoChannel)
            return newChannels
          }
          return channels
        })
      }
      navigate('/chat/' + channel.id)
    }
  )
}
