interface Props {
  children?: React.ReactNode
}

export default function ProfileContainer({ children }: Props) {
  return (
    <div className="flex flex-wrap items-start content-start"> {children}</div>
  )
}
