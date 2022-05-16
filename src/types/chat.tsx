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
  last_message_at: string
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
  sanction: string | null
  end_of_sanction: string
  channelId: number
  user: User
}

export interface Message {
  id: number
  content: string
  author: ProtoUser
  channelId: number
  created_at: string
}

export interface TransferedMessage {
  id: number
  channelId: number
  content: string
  author: User
}
