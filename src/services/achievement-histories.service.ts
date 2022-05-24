import api from '../api/api'
import Game, { GameBallSpeed, GamePlayerHeight } from '../types/game'
import { GameStatus } from '../types/game'
import { GameHistory, User } from '../types/user'
import gameService from './game.service'

const ROUTE = '/api/achievements-histories/'

class AchievementHistoriesService {
  async processAchievements(game: Game, user: User) {
    let gameHistory: GameHistory[] = gameService.getGameHistory(user)
    if (game.player1.user.id === user.id) {
      gameHistory.unshift({
        oppenent: game.player2.user,
        scoreOppenent: game.player2.score!,
        scorePlayer: game.player1.score!,
        won: game.player1.score! > game.player2.score!,
        draw: false,
        created_at: new Date().toString(),
      })
    } else {
      gameHistory.unshift({
        oppenent: game.player1.user,
        scoreOppenent: game.player1.score!,
        scorePlayer: game.player2.score!,
        won: game.player2.score! > game.player1.score!,
        draw: false,
        created_at: new Date().toString(),
      })
    }
    if (game.status === GameStatus.ENDED) {
      if (
        !user.achievement_history ||
        (user.achievement_history &&
          !(await user.achievement_history.find(
            (ah) => ah.achievement.id === 1
          )))
      ) {
        if (
          (game.player2.user.id === user.id &&
            game.player1.score! > game.player2.score!) ||
          (game.player1.user.id === user.id &&
            game.player1.score! < game.player2.score!)
        ) {
          await api.get(ROUTE + 'achievement/' + 1).then(async (response) => {
            if (response.data === '') {
              await api.post(ROUTE, {
                achievement_id: 1,
              })
            }
          })
        }
      }
      if (
        !user.achievement_history ||
        (user.achievement_history &&
          !(await user.achievement_history.find(
            (ah) => ah.achievement.id === 2
          )))
      ) {
        if (
          (game.player2.user.id === user.id &&
            game.player1.score! < game.player2.score!) ||
          (game.player1.user.id === user.id &&
            game.player1.score! > game.player2.score!)
        ) {
          await api.get(ROUTE + 'achievement/' + 2).then(async (response) => {
            if (response.data === '') {
              await api.post(ROUTE, {
                achievement_id: 2,
              })
            }
          })
        }
      }
      if (
        !user.achievement_history ||
        (user.achievement_history &&
          !(await user.achievement_history.find(
            (ah) => ah.achievement.id === 3
          )))
      ) {
        let timesArow: boolean = true
        if (gameHistory.length > 2) {
          for (let i: number = 0; i < 3; i++)
            if (gameHistory[i].won === false) timesArow = false
        } else {
          timesArow = false
        }
        if (timesArow) {
          await api.get(ROUTE + 'achievement/' + 3).then(async (response) => {
            if (response.data === '') {
              await api.post(ROUTE, {
                achievement_id: 3,
              })
            }
          })
        }
      }
      if (
        !user.achievement_history ||
        (user.achievement_history &&
          !(await user.achievement_history.find(
            (ah) => ah.achievement.id === 4
          )))
      ) {
        const last = gameHistory[0]
        if (last && last.won && last?.scorePlayer === 5) {
          await api.get(ROUTE + 'achievement/' + 4).then(async (response) => {
            if (response.data === '') {
              await api.post(ROUTE, {
                achievement_id: 4,
              })
            }
          })
        }
      }
      if (
        !user.achievement_history ||
        (user.achievement_history &&
          !(await user.achievement_history.find(
            (ah) => ah.achievement.id === 5
          )))
      ) {
        if (game.playerHeight === GamePlayerHeight.SMALL) {
          await api.get(ROUTE + 'achievement/' + 5).then(async (response) => {
            if (response.data === '') {
              console.log('passed by')
              await api.post(ROUTE, {
                achievement_id: 5,
              })
            }
          })
        }
      }
      if (
        !user.achievement_history ||
        (user.achievement_history &&
          !(await user.achievement_history.find(
            (ah) => ah.achievement.id === 6
          )))
      ) {
        let wins: number = 0
        if (gameHistory.length > 9)
          for (let i: number = gameHistory.length - 1; i >= 0; i--)
            if (gameHistory[i].won === true) wins++
        if (wins >= 10) {
          await api.get(ROUTE + 'achievement/' + 6).then(async (response) => {
            if (response.data === '') {
              await api.post(ROUTE, {
                achievement_id: 6,
              })
            }
          })
        }
      }
      if (
        !user.achievement_history ||
        (user.achievement_history &&
          !(await user.achievement_history.find(
            (ah) => ah.achievement.id === 7
          )))
      ) {
        const last = gameHistory[0]
        if (last && last.won && last?.scorePlayer === 10) {
          await api.get(ROUTE + 'achievement/' + 7).then(async (response) => {
            if (response.data === '') {
              await api.post(ROUTE, {
                achievement_id: 7,
              })
            }
          })
        }
      }
      if (
        !user.achievement_history ||
        (user.achievement_history &&
          !(await user.achievement_history.find(
            (ah) => ah.achievement.id === 8
          )))
      ) {
        let timesArow: boolean = true
        if (gameHistory.length > 4) {
          for (let i: number = 0; i < 5; i++) {
            if (gameHistory[i].won === false) timesArow = false
          }
        } else {
          timesArow = false
        }
        if (timesArow) {
          await api.get(ROUTE + 'achievement/' + 8).then(async (response) => {
            if (response.data === '') {
              await api.post(ROUTE, {
                achievement_id: 8,
              })
            }
          })
        }
      }
      if (
        !user.achievement_history ||
        (user.achievement_history &&
          !(await user.achievement_history.find(
            (ah) => ah.achievement.id === 9
          )))
      ) {
        const last = gameHistory[0]
        if (last && last.won && last?.scoreOppenent === 0) {
          await api.get(ROUTE + 'achievement/' + 9).then(async (response) => {
            if (response.data === '') {
              await api.post(ROUTE, {
                achievement_id: 9,
              })
            }
          })
        }
      }
      if (
        !user.achievement_history ||
        (user.achievement_history &&
          !(await user.achievement_history.find(
            (ah) => ah.achievement.id === 10
          )))
      ) {
        const last = gameHistory[0]
        if (last && last.won && game.ballSpeed === GameBallSpeed.FAST) {
          await api.get(ROUTE + 'achievement/' + 10).then(async (response) => {
            if (response.data === '') {
              await api.post(ROUTE, {
                achievement_id: 10,
              })
            }
          })
        }
      }
      if (
        !user.achievement_history ||
        (user.achievement_history &&
          !(await user.achievement_history.find(
            (ah) => ah.achievement.id === 11
          )))
      ) {
        let wins: number = 0
        if (gameHistory.length > 49)
          for (let i: number = gameHistory.length - 1; i >= 0; i--)
            if (gameHistory[i].won === true) wins++
        if (wins >= 50) {
          await api.get(ROUTE + 'achievement/' + 11).then(async (response) => {
            if (response.data === '') {
              await api.post(ROUTE, {
                achievement_id: 11,
              })
            }
          })
        }
      }
      if (
        !user.achievement_history ||
        (user.achievement_history &&
          !(await user.achievement_history.find(
            (ah) => ah.achievement.id === 12
          )))
      ) {
        let timesArow: boolean = true
        if (gameHistory.length > 9) {
          for (let i: number = 0; i < 10; i++)
            if (gameHistory[i].won === false) timesArow = false
        } else {
          timesArow = false
        }

        if (timesArow) {
          await api.get(ROUTE + 'achievement/' + 12).then(async (response) => {
            if (response.data === '') {
              await api.post(ROUTE, {
                achievement_id: 12,
              })
            }
          })
        }
      }
      if (
        !user.achievement_history ||
        (user.achievement_history &&
          !(await user.achievement_history.find(
            (ah) => ah.achievement.id === 13
          )))
      ) {
        const last = gameHistory[0]
        if (last && last.won && last?.scorePlayer === 15) {
          await api.get(ROUTE + 'achievement/' + 13).then(async (response) => {
            if (response.data === '') {
              await api.post(ROUTE, {
                achievement_id: 13,
              })
            }
          })
        }
      }
    }
  }
}

export default new AchievementHistoriesService()
