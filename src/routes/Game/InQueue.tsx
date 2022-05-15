import { useEffect } from 'react'
import { ReactComponent as SvgSpinner } from '../../assets/spinner.svg'

interface FindMatchProps {
  setStep: React.Dispatch<React.SetStateAction<string>>
}

export default function InQueue({ setStep }: FindMatchProps) {
  useEffect(() => {
    setTimeout(() => setStep('setup'), 5000)
  }, [setStep])
  return (
    <div className="flex flex-col items-center justify-center h-full w-full gap-8">
      <p className="font-semibold text-[2rem]">Waiting for an oppenent</p>
      <SvgSpinner className="fill-violet h-16 w-16 animate-spin" />
    </div>
  )
}
