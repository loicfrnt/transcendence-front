import { ReactComponent as ReloadSvg } from '../../../assets/reload.svg'

export default function NotInGame() {
  return (
    <div
      className={`flex flex-col items-center justify-center h-full w-full gap-6`}
    >
      <p className="text-2xl">User is not in game</p>
      {/* <ReloadSvg
        className="fill-gray hover:fill-violet duration-300 ease-in-out h-16"
        cursor={'pointer'}
      /> */}
    </div>
  )
}
