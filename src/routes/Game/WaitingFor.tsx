import Spinner from '../../components/Spinner'

interface FindMatchProps {
  message: string
}

export default function InQueue({ message }: FindMatchProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full gap-8">
      <p className="text-center font-semibold text-[2rem] leading-[2rem]">
        {message}
      </p>
      <Spinner />
    </div>
  )
}
