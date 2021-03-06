interface MyProps {}

export default function MainContainer(props: React.PropsWithChildren<MyProps>) {
  return (
    <div className={'overflow-y-auto w-full h-full flex justify-center'}>
      {props.children}
    </div>
  )
}
