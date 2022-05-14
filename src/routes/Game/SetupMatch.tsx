import ContentBox from '../../components/ContentBox'

interface FindMatchProps {
  setStep: React.Dispatch<React.SetStateAction<string>>
}

export default function SetupMatch({ setStep }: FindMatchProps) {
  function handleClick() {
    setStep('match')
  }
  return (
    <div className="flex items-center justify-evenly h-full w-full">
      <ContentBox button handleClick={(e) => handleClick()}>
        <p className="font-semibold text-[2rem] m-3 ease-in-out duration-300 group-hover:text-white">
          Setup Match
        </p>
      </ContentBox>
    </div>
  )
}
