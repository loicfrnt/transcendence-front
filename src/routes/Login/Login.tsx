import MainContainer from '../../components/MainContainer'

export interface LoginProps {
  setConnected: React.Dispatch<React.SetStateAction<boolean>>
}

export function Login({ setConnected }: LoginProps) {
  function handleClick() {
    setConnected(true)
  }
  return (
    <div>
      <div>Welcome to Transcendence</div>
      <button onClick={(e) => handleClick()}>Sign in with 42's API</button>
    </div>
  )
}
