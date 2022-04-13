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

export interface User {
  id: number
  email: string
  username: string
  avatarId: number // ?
  status: UserStatus
  victories: number
  defeats: number
  sentRelationships: Relationship[]
  receivedRelationships: Relationship[]
}
