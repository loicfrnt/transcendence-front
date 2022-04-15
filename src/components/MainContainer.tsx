interface MyProps {}

export default function MainContainer(props: React.PropsWithChildren<MyProps>) {
  return <div className="pl-20">{props.children}</div>
}
