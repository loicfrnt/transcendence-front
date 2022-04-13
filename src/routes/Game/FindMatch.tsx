interface FindMatchProps {
  setMatch: React.Dispatch<React.SetStateAction<boolean>>
}

export default function FindMatch({ setMatch }: FindMatchProps) {
  function handleClick() {
    setMatch(true)
  }
  return <button onClick={(e) => handleClick()}>Find match</button>
}
