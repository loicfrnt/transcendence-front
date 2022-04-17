import ContentBox from '../../components/ContentBox'

interface FindMatchProps {
  setMatch: React.Dispatch<React.SetStateAction<boolean>>
}

export default function FindMatch({ setMatch }: FindMatchProps) {
  function handleClick() {
    setMatch(true)
  }
  return (
    <div className="flex items-center justify-evenly h-full w-full">
      <ContentBox button handleClick={(e) => handleClick()}>
        <p className="font-semibold text-[2rem] m-3 ease-in-out duration-300 group-hover:text-white">
          Find match
        </p>
      </ContentBox>
    </div>
  )
}
