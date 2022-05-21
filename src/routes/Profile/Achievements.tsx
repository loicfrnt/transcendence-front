import { AcheivementHistory } from '../../types/acheivement-history'
import SocialItemContainer from './SocialItemContainer'
import SocialItemList from './SocialItemList'
import { ReactComponent as SvgTrophy } from '../../assets/trophy.svg'
import { AcheivementType } from '../../types/acheivement'

const fake: AcheivementHistory[] = [
  {
    id: 0,
    isRead: false,
    acheivement: {
      id: 200,
      type: AcheivementType.BRONZE,
      category: 2,
      message: 'Get a bronze achievement',
    },
  },
  {
    id: 1,
    isRead: false,
    acheivement: {
      id: 100,
      type: AcheivementType.SILVER,
      category: 3,
      message: 'Get a silver achievement',
    },
  },
  {
    id: 2,
    isRead: false,
    acheivement: {
      id: 100,
      type: AcheivementType.GOLD,
      category: 3,
      message: 'Get a gold achievement',
    },
  },
]

interface achievementProps {
  ah: AcheivementHistory
}

function RenderAchievement({ ah }: achievementProps) {
  const tropyFill = () => {
    switch (ah.acheivement.type) {
      default:
      case AcheivementType.BRONZE:
        return 'fill-bronze'
      case AcheivementType.SILVER:
        return 'fill-silver'
      case AcheivementType.GOLD:
        return 'fill-gold'
    }
  }
  return (
    <div
      key={ah.id}
      className="bg-gray-light rounded-3xl h-24 pl-5 w-full flex items-center gap-5"
    >
      <SvgTrophy className={`h-12  ${tropyFill()}`} />
      <h2 className="font-semibold text-lg">{ah.acheivement.message}</h2>
    </div>
  )
}

interface Props {
  achievementHistory: AcheivementHistory[]
}

export default function Achievements({ achievementHistory }: Props) {
  return (
    <SocialItemContainer title="Achievements">
      <SocialItemList>
        {/* {achievementHistory.map((ah) => renderAchievement(ah))} */}
        <>
          {fake.map((ah) => (
            <RenderAchievement ah={ah} key={ah.id} />
          ))}
        </>
      </SocialItemList>
    </SocialItemContainer>
  )
}
