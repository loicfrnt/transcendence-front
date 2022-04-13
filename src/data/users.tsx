import { User } from '../types/user'

export const thisUser: User = {
  id: 1,
  email: 'mbouzaie@student.42.fr',
  username: 'med',
  avatarId: 1,
  status: 0,
  victories: 1,
  defeats: 1,
  sentRelationships: [
    {
      id: 3,
      issuer_id: 1,
      receiver_id: 9,
      status: 0,
    },
    {
      id: 5,
      issuer_id: 1,
      receiver_id: 10,
      status: 0,
    },
  ],
  receivedRelationships: [
    {
      id: 5,
      issuer_id: 12,
      receiver_id: 1,
      status: 0,
    },
  ],
}
