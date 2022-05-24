import axios from '../api/axios'
import { achievementsList } from '../data/achievements'

const ROUTE = '/api/achievements/'

class AchievementsService {
  load() {
    axios.get(ROUTE).then((response) => {
      if (response.data === undefined || response.data.length === 0) {
        axios.post(ROUTE, achievementsList).then((response) => {
          return response
        })
      }
    })
  }
}

export default new AchievementsService()
