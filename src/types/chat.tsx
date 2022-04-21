import { User } from './user'

export interface Channel {
  id: number
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
  channel: null
  user: User
}

export interface Message {
  id: number
  content: string
  author: User
}
