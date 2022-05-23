import api from '../api/api'
import { Channel, NewChannel, ProtoChannel } from '../types/chat'

const URL = process.env.PUBLIC_URL
const ROUTE = '/api/channels/'

class ChatService {
  getChannels(
    setChannels: React.Dispatch<React.SetStateAction<ProtoChannel[]>>,
    setInvitedChannels: React.Dispatch<React.SetStateAction<ProtoChannel[]>>,
    setChannelsLoaded: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    // GET channels list
    api.get(URL + ROUTE).then((response) => {
      if (response.status === 200) {
        setChannels(response.data.user_channels)
        setChannelsLoaded(true)
        setInvitedChannels(response.data.invited_channels)
      }
    })
  }

  getJoinableChannels(
    setChannels: React.Dispatch<React.SetStateAction<ProtoChannel[]>>
  ) {
    // GET available channels list, remove already joined ones
    api.get(URL + ROUTE).then((response) => {
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
    api
      .get(URL + ROUTE + channelId)
      .then((response) => {
        if (response.status === 200) setChannel(response.data)
      })
      .catch(() => {
        setChannel(undefined)
      })
  }

  async createChannel(newChannel: NewChannel) {
    return api
      .post(URL + ROUTE, newChannel)
      .then((data) => {
        return data
      })
      .catch((err) => {
        throw new Error(err)
      })
  }

  patchChannel(
    channel: Channel,
    updated: NewChannel,
    setChannel: React.Dispatch<React.SetStateAction<Channel | undefined>>
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
    api
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

  deleteChannel(channelId: number) {
    api.delete(URL + ROUTE + channelId).then()
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
