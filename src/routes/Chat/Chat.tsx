import ContentBox from '../../components/ContentBox'
import MainContainer from '../../components/MainContainer'

function Chat() {
  return (
    <MainContainer>
      <div className="flex items-center justify-center sm:justify-start w-full h-full flex-wrap">
        <ContentBox className="w-[400px]"></ContentBox>
        <ContentBox className="w-[400px] sm:max-w-[836px]  sm:grow"></ContentBox>
        <ContentBox className="w-[400px]"></ContentBox>
      </div>
    </MainContainer>
  )
}

export default Chat
