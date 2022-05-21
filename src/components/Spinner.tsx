import { ReactComponent as SvgSpinner } from '../assets/spinner.svg'

interface Props {
  size?: string
  center?: boolean
}

export default function Spinner({
  size = 'h-16 w-16 ',
  center = false,
}: Props) {
  if (center)
    return (
      <div className="flex items-center justify-center">
        <SvgSpinner className={`fill-violet animate-spin ${size}`} />
      </div>
    )
  return <SvgSpinner className={`fill-violet animate-spin ${size}`} />
}
