import { User, ProtoUser } from './user'

export interface NewChannel {
  name: string
  status: string
  password: string
}

export interface ProtoChannel {
  id: number
  name: string
  status: string
  channelUsers?: ChannelUser[]
}

export interface Channel {
  id: number
  name: string
  status: string
  channelUsers: ChannelUser[]
  invited_members: User[]
  messages: Message[]
}

export interface ChannelUser {
  id: number
  role: number
  sanction: null
  end_of_sanction: null
  channelId: number
  user: User
}

export interface Message {
  id: number
  content: string
  author: ProtoUser
}

export interface TransferedMessage {
  id: number
  channelId: number
  content: string
  author: User
}
