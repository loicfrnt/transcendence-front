import { ReactComponent as SvgSpinner } from '../../assets/spinner.svg'
import ContentBox from '../../components/ContentBox'

interface Props {
  role: string
}
export default function PlayerLeft({ role }: Props) {
  return (
    <div
      className={`flex bg-opacity-80 bg-violet-black items-center justify-center fixed w-screen h-screen inset-0 `}
    >
      <ContentBox
        className={
          'flex flex-wrap justify-center items-center gap-4 max-w-[100vw]'
        }
      >
        <p className="text-[1rem]">Waiting for {role} to reconnect</p>
        <SvgSpinner className="fill-violet h-10 w-10 animate-spin" />
      </ContentBox>
    </div>
  )
}
