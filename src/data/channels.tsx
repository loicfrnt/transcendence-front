import { Channel } from '../types/chat'
import { thisUser, mechant, userList } from '../data/users'

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
    { id: 6, content: 'mdr', author: mechant },
    {
      id: 7,
      content: 'AAAAAAAAAAAH GROS CON comment tu vas le SANNNG',
      author: thisUser,
    },
    { id: 8, content: 'trankilr hein cv et toi ?', author: mechant },
    { id: 9, content: 'oe oe', author: thisUser },
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
      id: 2,
      role: 1,
      sanction: null,
      end_of_sanction: null,
      channel: null,
      user: userList[1],
    },
  ],
  invited_members: [],
  messages: [{ id: 0, content: 'ya pas foule hein', author: mechant }],
}

export const myChannel: Channel = {
  id: 2,
  status: 'group',
  name: 'MA conversation',
  channelUsers: [
    {
      id: 0,
      role: 3,
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
      user: userList[1],
    },
    {
      id: 2,
      role: 1,
      sanction: null,
      end_of_sanction: null,
      channel: null,
      user: userList[0],
    },
  ],
  invited_members: [],
  messages: [
    { id: 0, content: 'sdq', author: thisUser },
    { id: 1, content: 'oiudsfjk', author: userList[1] },
    { id: 2, content: 'bfgjk', author: userList[0] },
    { id: 3, content: 'ya djfaslkfjk ?', author: userList[1] },
    { id: 4, content: 'papb', author: userList[1] },
    {
      id: 5,
      content:
        "La seconde bataille de Smolensk (7 août 1943 – 2 octobre 1943) est une offensive majeure de la Seconde Guerre mondiale, lancée par l'Armée rouge sur le front de l'Est, simultanément à la bataille du Dniepr. Cette offensive longue de deux mois, menée par les généraux Andreï Ieremenko et Vassili Sokolovski, visait à nettoyer de toute présence militaire allemande les régions de Smolensk et de Briansk. La ville de Smolensk était sous occupation allemande depuis la première bataille de Smolensk, qui s'était déroulée en 1941.",
      author: userList[0],
    },
    { id: 6, content: 'passionant', author: userList[1] },
    { id: 7, content: 'hein', author: userList[1] },
  ],
}
