interface Props {
  msg: string
}

export default function SocialNoItem({ msg }: Props) {
  return <h2 className="text-gray text-lg">{msg}</h2>
}
