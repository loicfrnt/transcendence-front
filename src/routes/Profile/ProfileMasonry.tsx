import Masonry from 'react-masonry-css'

interface Props {
  children?: React.ReactNode
}

export default function ProfileMasonry({ children }: Props) {
  const breakpoints = {
    default: 4,
    1880: 3,
    1480: 2,
    960: 1,
  }
  return (
    <Masonry breakpointCols={breakpoints} className="flex w-full">
      {children}
    </Masonry>
  )
}
