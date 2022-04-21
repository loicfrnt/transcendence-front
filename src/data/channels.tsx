import { Channel } from '../types/chat'
import { thisUser, mechant } from '../data/users'

export const dummyDm: Channel = {
  id: 0,
  status: 'direct_message',
  name: '',
  channelUsers: [
    {
      id: 0,
      role: 1,
      sanction: null,
      end_of_sanction: null,
      channel: null,
      user: thisUser,
    },
    {
      id: 1,
      role: 1,
      sanction: null,
      end_of_sanction: null,
      channel: null,
      user: mechant,
    },
  ],
  invited_members: [],
  messages: [
    { id: 0, content: 'coucou', author: mechant },
    { id: 1, content: 'euh t ki', author: thisUser },
    { id: 2, content: 'asv?', author: mechant },
    {
      id: 3,
      content:
        'euh nan casse toi je veux pas dennui moi et dabord dou tu me parle jsp t ki frr',
      author: thisUser,
    },
    { id: 5, content: 'JDECONNE PTN C MARC', author: mechant },
    {
      id: 6,
      content: 'AAAAAAAAAAAH GROS CON comment tu vas le SANNNG',
      author: thisUser,
    },
    { id: 7, content: 'trankilr hein cv et toi ?', author: mechant },
    { id: 8, content: 'oe oe', author: thisUser },
  ],
}

export const dummyChannel: Channel = {
  id: 1,
  status: 'group',
  name: 'Le groupe des zinzins',
  channelUsers: [
    {
      id: 0,
      role: 1,
      sanction: null,
      end_of_sanction: null,
      channel: null,
      user: thisUser,
    },
    {
      id: 1,
      role: 1,
      sanction: null,
      end_of_sanction: null,
      channel: null,
      user: mechant,
    },
    {
      id: 1,
      role: 1,
      sanction: null,
      end_of_sanction: null,
      channel: null,
      user: mechant,
    },
  ],
  invited_members: [],
  messages: [
    { id: 0, content: 'coucou', author: mechant },
    { id: 1, content: 'euh t ki', author: thisUser },
    { id: 2, content: 'asv?', author: mechant },
    {
      id: 3,
      content:
        'euh nan casse toi je veux pas dennui moi et dabord dou tu me parle jsp t ki frr',
      author: thisUser,
    },
    { id: 5, content: 'JDECONNE PTN C MARC', author: mechant },
    {
      id: 6,
      content: 'AAAAAAAAAAAH GROS CON comment tu vas le SANNNG',
      author: thisUser,
    },
    { id: 7, content: 'trankilr hein cv et toi ?', author: mechant },
    { id: 8, content: 'oe oe', author: thisUser },
  ],
}
