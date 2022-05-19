import { ReactComponent as SvgSpinner } from '../assets/spinner.svg'

interface Props {
  size?: string
}

export default function Spinner({ size = 'h-16 w-16 ' }: Props) {
  return <SvgSpinner className={`fill-violet animate-spin ${size}`} />
}
