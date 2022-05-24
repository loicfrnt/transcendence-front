import { AchievementHistory } from '../../types/achievement-history'
import SocialItemContainer from './SocialItemContainer'
import SocialItemList from './SocialItemList'
import { ReactComponent as SvgTrophy } from '../../assets/trophy.svg'
import { AchievementType } from '../../types/achievement'
import SocialNoItem from './SocialNoItem'

interface achievementProps {
  ah: AchievementHistory
}

function RenderAchievement({ ah }: achievementProps) {
  const tropyFill = () => {
    switch (ah.achievement.type) {
      default:
      case AchievementType.BRONZE:
        return 'fill-bronze'
      case AchievementType.SILVER:
        return 'fill-silver'
      case AchievementType.GOLD:
        return 'fill-gold'
    }
  }
  return (
    <div
      key={ah.id}
      className="bg-gray-light rounded-3xl h-24 pl-5 w-full flex items-center gap-5"
    >
      <SvgTrophy className={`h-12  ${tropyFill()}`} />
      <h2 className="font-semibold text-lg">{ah.achievement.message}</h2>
    </div>
  )
}

interface Props {
  achievementHistory: AchievementHistory[]
}

export default function Achievements({ achievementHistory }: Props) {
  return (
    <SocialItemContainer title="Achievements">
      <SocialItemList>
        {achievementHistory === undefined || achievementHistory.length === 0 ? (
          <SocialNoItem msg="Play to get achievements" />
        ) : (
          <>
            {achievementHistory.map((ah) => (
              <RenderAchievement ah={ah} key={ah.id} />
            ))}
          </>
        )}
      </SocialItemList>
    </SocialItemContainer>
  )
}
