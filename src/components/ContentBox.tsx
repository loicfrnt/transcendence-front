import { MouseEventHandler } from 'react'

interface MyProps {
  className?: string
  button?: boolean
  children?: React.ReactNode
  handleClick?: MouseEventHandler
}
export default function ContentBox({
  className = '',
  button = false,
  children = <p>empty_content</p>,
  handleClick = () => null,
}: MyProps) {
  const style = 'bg-white rounded-3xl p-3 mx-5 ' + className
  return button ? (
    <button
      className={style + ' group hover:bg-violet ease-in-out duration-300'}
      onClick={handleClick}
    >
      {children}
    </button>
  ) : (
    <div className={style} onClick={handleClick}>
      {children}
    </div>
  )
}
