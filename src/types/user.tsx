import { Channel } from './chat'

export enum UserStatus {
  Offline = 0,
  Online,
  Busy,
  Playing,
}

export enum RelStatus {
  Pending = 0,
  Friends,
  Blocked,
}

export interface Relationship {
  id: number
  issuer_id: number
  receiver_id: number
  status: RelStatus
}

export interface History {
  oppenent: User
  won: boolean
  scoreOppenent: number
  scorePlayer: number
}

export interface User {
  id: number
  email: string
  username: string
  avatar_id: number // ?
  isTwoFactorAuthenticationEnabled: boolean
  status: UserStatus
  victories: number
  defeats: number
  history: History[]
  channels: Channel[]
  sentRelationships: Relationship[]
  received_relationships: Relationship[]
}

export interface ProtoUser {
  id: number
  email: string
  username: string
  avatar_id: number
  isTwoFactorAuthenticationEnabled: boolean
  status: UserStatus
  victories: number
  defeats: number
}
