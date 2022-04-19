import ContentBox from '../../components/ContentBox'

interface Props {
  children: React.ReactElement
  title: string
}
export default function SocialItemContainer({ children, title }: Props) {
  return (
    <ContentBox className="w-[400px] flex flex-col  pt-3 px-6 grid-item mb-10 max-h-[75vh]">
      <h1 className={'mb-4 text-[2rem] leading-[2.625rem] font-semibold'}>
        {title}
      </h1>
      {children}
    </ContentBox>
  )
}
