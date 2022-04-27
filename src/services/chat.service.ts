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
    axios.get(URL + ROUTE).then((response) => {
      if (response.status === 200) {
        let channels: Channel[] = []
        // console.log(response.data.user_channels)
        response.data.user_channels.map((current: Channel) =>
          axios
            .get(process.env.PUBLIC_URL + ROUTE + current.id)
            .then((response) => {
              if (response.status === 200) {
                console.log(response.data)
                channels = [...channels, response.data]
              }
              setChannels(channels)
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
