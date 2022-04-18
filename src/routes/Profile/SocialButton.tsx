import { MouseEventHandler } from 'react'

interface MyProps {
  //children?: React.ReactNode
  content: string
  handleClick?: MouseEventHandler<HTMLButtonElement>
}

export default function SocialButton({ handleClick, content }: MyProps) {
  return (
    <button
      className="bg-gray-light rounded-xl min-w-[9em] py-3 hover:bg-violet duration-100 ease-in-out group"
      onClick={handleClick}
    >
      <p className="font-semibold text-[1.2rem] group-hover:text-white duration-100 ease-in-out">
        {content}
      </p>
    </button>
  )
}
