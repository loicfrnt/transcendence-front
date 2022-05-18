import { ReactComponent as SvgSpinner } from '../../assets/spinner.svg'

interface FindMatchProps {
  message: string
}

export default function InQueue({ message }: FindMatchProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full gap-8">
      <p className="font-semibold text-[2rem]">{message}</p>
      <SvgSpinner className="fill-violet h-16 w-16 animate-spin" />
    </div>
  )
}
