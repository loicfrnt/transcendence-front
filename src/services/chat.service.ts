import axios from 'axios'
import { Channel, TransferedMessage } from '../types/chat'

const ROUTE = '/api/channels/'

class ChatService {
  setChannels(setChannels: React.Dispatch<React.SetStateAction<Channel[]>>) {
    axios.get(process.env.PUBLIC_URL + ROUTE).then((response) => {
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

  receiveMessage(
    message: TransferedMessage,
    setChannels: React.Dispatch<React.SetStateAction<Channel[]>>,
    channels: Channel[]
  ) {
    let newChannels = [...channels]
    const channelId = message.channel.id
    newChannels.find((c) => c.id === channelId)?.messages.push(message)
    setChannels(newChannels)
  }

  // register(username: string, email: string, password:string) {
  //     return axios.post(process.env.PUBLIC_URL + ROUTE + "register", {
  //         username,
  //         email,
  //         password
  //     }).then(response =>{
  //         return response.data;
  //     });
  // }
}

export default new ChatService()
