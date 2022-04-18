import ContentBox from '../../components/ContentBox'

export interface LoginProps {
  setConnected: React.Dispatch<React.SetStateAction<boolean>>
}

export function Login({ setConnected }: LoginProps) {
  function handleClick() {
    setConnected(true)
  }
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-10">
      <div className="font-title text-[3rem] text-violet text-center">
        <h2>Welcome to</h2>
        <h1 className="text-[5rem]">Transcendence</h1>
      </div>
      <ContentBox button handleClick={() => handleClick()}>
        <p className="font-semibold text-[2rem] m-3 ease-in-out duration-300 group-hover:text-white">
          Sign in with 42's API
        </p>
      </ContentBox>
    </div>
  )
}
