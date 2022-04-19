interface Props {
  children: React.ReactElement
}
export default function SocialItemContainer({ children }: Props) {
  return (
    <div className="overflow-hidden hover:overflow-auto flex flex-col gap-3 pr-0">
      {children}
    </div>
  )
}
