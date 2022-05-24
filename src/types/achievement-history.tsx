import { Achievement } from './achievement'

export interface AchievementHistory {
  id: number
  isRead: boolean
  achievement: Achievement
}
