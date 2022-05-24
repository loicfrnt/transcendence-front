import {
  Achievement,
  AchievementCategory,
  AchievementType,
} from '../types/achievement'

export const achievementsList: Achievement[] = [
  {
    id: 1,
    type: AchievementType.BRONZE,
    category: AchievementCategory.NULL,
    message: ' First defeat!',
  },
  {
    id: 2,
    type: AchievementType.BRONZE,
    category: AchievementCategory.WINS,
    message: 'First win!',
  },
  {
    id: 3,
    type: AchievementType.BRONZE,
    category: AchievementCategory.ON_ROW,
    message: 'Win 3 times in a row',
  },
  {
    id: 4,
    type: AchievementType.BRONZE,
    category: AchievementCategory.SCORE,
    message: 'Win with a score of 5',
  },
  {
    id: 5,
    type: AchievementType.BRONZE,
    category: AchievementCategory.SMALL,
    message: 'Small size master!',
  },
  {
    id: 6,
    type: AchievementType.SILVER,
    category: AchievementCategory.WINS,
    message: 'Win 10 times!',
  },
  {
    id: 7,
    type: AchievementType.SILVER,
    category: AchievementCategory.SCORE,
    message: 'Win with a score of 10',
  },
  {
    id: 8,
    type: AchievementType.SILVER,
    category: AchievementCategory.ON_ROW,
    message: 'Win 5 times in a row!',
  },
  {
    id: 9,
    type: AchievementType.SILVER,
    category: AchievementCategory.NO_SCORE,
    message: 'Win without letting the opponent score!',
  },
  {
    id: 10,
    type: AchievementType.SILVER,
    category: AchievementCategory.FAST,
    message: 'Win with a fast ball speed!',
  },
  {
    id: 11,
    type: AchievementType.GOLD,
    category: AchievementCategory.WINS,
    message: 'Win 50 times!',
  },
  {
    id: 12,
    type: AchievementType.GOLD,
    category: AchievementCategory.ON_ROW,
    message: 'Win 10 times in a row!',
  },
  {
    id: 13,
    type: AchievementType.GOLD,
    category: AchievementCategory.SCORE,
    message: 'Win with a score of 15!',
  },
]
