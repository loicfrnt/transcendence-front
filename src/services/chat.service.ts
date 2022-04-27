import axios from 'axios'
import {
  Channel,
  NewChannel,
  ProtoChannel,
  TransferedMessage,
} from '../types/chat'

const URL = process.env.PUBLIC_URL
const ROUTE = '/api/channels/'

class ChatService {
  getChannels(setChannels: React.Dispatch<React.SetStateAction<Channel[]>>) {
    // GET channels list
    axios.get(URL + ROUTE).then((response) => {
      if (response.status === 200) {
        let channels: Channel[] = []
        let protoChannels: ProtoChannel[] = response.data.user_channels
        let completeCalls = 0
        // console.log(response.data.user_channels)
        // GET all channels, one at a time
        protoChannels.map((current: ProtoChannel) =>
          axios
            .get(process.env.PUBLIC_URL + ROUTE + current.id)
            .then((response) => {
              if (response.status === 200) {
                console.log(response.data)
                channels = [...channels, response.data]
              }
              // When the last Channel has been received
              if (++completeCalls === protoChannels.length) {
                // Sort them and set their state in app
                setChannels(channels.sort((a, b) => a.id - b.id))
              }
            })
        )
      }
    })
  }

  createChannel(
    newChannel: NewChannel,
    setChannels: React.Dispatch<React.SetStateAction<Channel[]>>
  ) {
    axios
      .post(URL + ROUTE, newChannel)
      .then(() => this.getChannels(setChannels))
  }

  receiveMessage(
    message: TransferedMessage,
    setChannels: React.Dispatch<React.SetStateAction<Channel[]>>,
    channels: Channel[]
  ) {
    let newChannels = [...channels]
    const channelId = message.channelId
    newChannels.find((c) => c.id === channelId)?.messages.push(message)
    setChannels(newChannels)
  }
}

export default new ChatService()
