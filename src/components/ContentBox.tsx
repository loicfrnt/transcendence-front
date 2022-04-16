interface MyProps {
  className?: string
}
export default function ContentBox(props: React.PropsWithChildren<MyProps>) {
  return (
    <div className={'bg-white rounded-2xl p-3 ' + props.className}>
      {props.children}
    </div>
  )
}
