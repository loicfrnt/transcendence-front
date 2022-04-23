import Masonry from 'react-masonry-css'

interface Props {
  children?: React.ReactNode
}

export default function ProfileMasonry({ children }: Props) {
  const breakpoints = {
    default: 4,
    1838: 3,
    1412: 2,
    966: 1,
  }
  return (
    <Masonry
      breakpointCols={breakpoints}
      className="flex justify-center sm:justify-start mt-8 max-w-[440px] sm:max-w-[876px] md:max-w-[1312px] lg:max-w-[1748px] w-full shrink"
    >
      {children}
    </Masonry>
  )
}
