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
      className="flex ml-3 mt-8 w-[440px] prof_sm:w-[876px] prof_md:w-[1312px] prof_lg:w-[1748px] "
    >
      {children}
    </Masonry>
  )
}
