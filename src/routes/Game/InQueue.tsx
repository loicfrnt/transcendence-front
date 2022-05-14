import { useEffect } from 'react'
import ContentBox from '../../components/ContentBox'

interface FindMatchProps {
  setStep: React.Dispatch<React.SetStateAction<string>>
}

export default function InQueue({ setStep }: FindMatchProps) {
  useEffect(() => {
    setTimeout(() => setStep('setup'), 5000)
  }, [setStep])
  return (
    <div className="flex items-center justify-evenly h-full w-full">
      <ContentBox>
        <p className="font-semibold text-[2rem] m-3 ease-in-out duration-300 group-hover:text-white">
          In queue...
        </p>
      </ContentBox>
    </div>
  )
}
