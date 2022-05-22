import { useEffect } from 'react'
import { useState } from 'react'
import { ReactComponent as SvgSpinner } from '../../assets/spinner.svg'
import ContentBox from '../../components/ContentBox'

interface Props {
  role: string
}
export default function PlayerLeft({ role }: Props) {
  const [timeLeft, setTimeLeft] = useState(10)

  useEffect(() => {
    const interval = setInterval(
      () => setTimeLeft((timeLeft) => timeLeft - 1),
      1000
    )
    return () => clearInterval(interval)
  }, [])

  const getTimeLeft = () => {
    return timeLeft + ' second' + (timeLeft > 1 ? 's' : '')
  }

  return (
    <div
      className={`flex bg-opacity-80 bg-violet-black items-center justify-center fixed w-screen h-screen inset-0 z-10`}
    >
      <ContentBox
        className={
          'flex flex-wrap justify-center items-center gap-4 max-w-[100vw]'
        }
      >
        <p className="text-[1rem]">
          Waiting for {role} to reconnect... {getTimeLeft()} left
        </p>
        <SvgSpinner className="fill-violet h-10 w-10 animate-spin" />
      </ContentBox>
    </div>
  )
}
