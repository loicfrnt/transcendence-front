export enum AchievementType {
  BRONZE = 0,
  SILVER = 1,
  GOLD = 2,
}

export enum AchievementCategory {
  NULL = 0,
  WINS = 1,
  ON_ROW = 2,
  SMALL = 3,
  SCORE = 4,
  NO_SCORE = 5,
  FAST = 6,
}

export interface Achievement {
  id: number
  type: AchievementType
  category: AchievementCategory
  message: string
}
