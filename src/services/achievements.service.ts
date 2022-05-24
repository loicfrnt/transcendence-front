import api from '../api/api'
import { achievementsList } from '../data/achievements'

const ROUTE = '/api/achievements/'

class AchievementsService {
  load() {
    api.get(ROUTE).then((response) => {
      if (response.data === undefined || response.data.length === 0) {
        api.post(ROUTE, achievementsList).then((response) => {
          return response
        })
      }
    })
  }
}

export default new AchievementsService()
