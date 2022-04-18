import { User } from '../types/user'

export const mechant: User = {
  id: 5,
  email: 'mechant@student.42.fr',
  username: 'mechant',
  avatarId: 5,
  status: 0,
  victories: 13,
  defeats: 3,
  sentRelationships: [],
  receivedRelationships: [],
  history: [],
}

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
  history: [
    { oppenent: mechant, won: true, scoreOppenent: 4, scorePlayer: 10 },
    { oppenent: mechant, won: false, scoreOppenent: 10, scorePlayer: 8 },
    { oppenent: mechant, won: false, scoreOppenent: 10, scorePlayer: 9 },
    { oppenent: mechant, won: true, scoreOppenent: 4, scorePlayer: 10 },
  ],
}

export const userList: User[] = [
  {
    id: 2,
    email: 'otherStudent@student.42.fr',
    username: 'otherUser',
    avatarId: 2,
    status: 0,
    victories: 3,
    defeats: 2,
    sentRelationships: [],
    receivedRelationships: [],
    history: [],
  },
  {
    id: 3,
    email: 'felipe@student.42.fr',
    username: 'Felipe el crack',
    avatarId: 3,
    status: 0,
    victories: 0,
    defeats: 9890,
    sentRelationships: [],
    receivedRelationships: [],
    history: [],
  },
  thisUser,
  thisUser,
  thisUser,
  thisUser,
  thisUser,
  thisUser,
  thisUser,
  thisUser,
  thisUser,
]
