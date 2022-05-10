import axios from 'axios'
import { Channel, NewChannel, ProtoChannel } from '../types/chat'

const URL = process.env.PUBLIC_URL
const ROUTE = '/api/channels/'

class ChatService {
  getChannels(
    setChannels: React.Dispatch<React.SetStateAction<ProtoChannel[]>>
  ) {
    // GET channels list
    axios.get(URL + ROUTE).then((response) => {
      if (response.status === 200) {
        setChannels(response.data.user_channels)
      }
    })
  }

  getJoinableChannels(
    setChannels: React.Dispatch<React.SetStateAction<ProtoChannel[]>>
  ) {
    // GET available channels list, remove already joined ones
    axios.get(URL + ROUTE).then((response) => {
      if (response.status === 200) {
        let availableChans: ProtoChannel[] = response.data.available_channels
        let userChans: ProtoChannel[] = response.data.user_channels
        setChannels(
          availableChans.filter(
            (chan) =>
              userChans.find((userChan) => userChan.id === chan.id) ===
              undefined
          )
        )
      }
    })
  }

  getChannel(
    channelId: number,
    setChannel: React.Dispatch<React.SetStateAction<Channel | undefined>>
  ) {
    axios
      .get(URL + ROUTE + channelId)
      .then((response) => {
        if (response.status === 200) setChannel(response.data)
      })
      .catch(() => {
        setChannel(undefined)
      })
  }

  createChannel(
    newChannel: NewChannel,
    setChannels: React.Dispatch<React.SetStateAction<ProtoChannel[]>>
  ) {
    axios
      .post(URL + ROUTE, newChannel)
      .then(() => this.getChannels(setChannels))
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data.message)
        }
      })
  }

  patchChannel(
    channel: Channel,
    updated: NewChannel,
    setChannel: React.Dispatch<React.SetStateAction<Channel | undefined>>,
    setChannels: React.Dispatch<React.SetStateAction<ProtoChannel[]>>
  ) {
    let payload: {
      id: string
      name: string
      status?: string
      password?: string
    } = {
      id: channel.id.toString(),
      name: updated.name,
    }
    if (updated.password.length) payload.password = updated.password
    if (channel.status !== updated.status) payload.status = updated.status
    console.log(payload)
    axios
      .patch(URL + ROUTE + channel.id, payload)
      .then((response) => {
        setChannel((channel) => {
          if (channel) {
            let newChan: Channel = { ...channel }
            newChan.name = response.data.name ?? newChan.name
            newChan.status = response.data.status ?? newChan.status
            return newChan
          }
          return undefined
        })
      })
      .catch((error) => console.log(error.response.data.message))
  }

  deleteChannel(
    channelId: number,
    setChannels: React.Dispatch<React.SetStateAction<ProtoChannel[]>>
  ) {
    axios
      .delete(URL + ROUTE + channelId)
      .then(() => this.getChannels(setChannels))
  }

  //   receiveMessage(
  //     message: TransferedMessage,
  //     setChannels: React.Dispatch<React.SetStateAction<ProtoChannel[]>>,
  //     channel: Channel
  //   ) {
  //     let newChannels = [...channels]
  //     const channelId = message.channelId
  //     // newChannels.find((c) => c.id === channelId)?.messages.push(message)
  //     setChannels(newChannels)
  //   }
}

export default new ChatService()
