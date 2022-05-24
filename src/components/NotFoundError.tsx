import MainContainer from './MainContainer'

interface Props {}

export default function NotFoundErr() {
  return (
    <MainContainer>
      <div className="flex justify-center items-center">
        <span className="text-[2rem]"> Not found</span>
      </div>
    </MainContainer>
  )
}
