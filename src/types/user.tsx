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

export interface GameHistory {
  oppenent: User
  won: boolean
  draw: boolean
  scoreOppenent: number
  scorePlayer: number
  created_at: string
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
  gamesAsPlayer1: any[]
  gamesAsPlayer2: any[]
  // history: History[]
  channels: Channel[]
  sent_relationships: Relationship[]
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
