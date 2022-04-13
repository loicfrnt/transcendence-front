interface LogOutProps {
  setConnected: React.Dispatch<React.SetStateAction<boolean>>
}

export default function LogOut({ setConnected }: LogOutProps) {
  function handleClick() {
    setConnected(false)
  }
  return <button onClick={(e) => handleClick()}>Log Out</button>
}
