import { ChangeEvent, useEffect, useRef, useState } from 'react'
import localFilesService from '../services/local-files.service'
import usersService from '../services/users.service'
import { ReactComponent as Edit } from '../assets/pen.svg'
import { User, UserStatus } from '../types/user'
import { Link } from 'react-router-dom'

interface AvatarProps {
  avatarId: number
  username: string
  currUser?: boolean
  setCurrUser?: React.Dispatch<React.SetStateAction<User>> | null
  size?: string
  status: UserStatus
  addStatus?: boolean
  noLink?: boolean
}

export default function Avatar({
  avatarId,
  username,
  currUser = false,
  setCurrUser = null,
  size = 'h-16 w-16',
  status,
  noLink = false,
  addStatus = false,
}: AvatarProps) {
  const classes = `block bg-cover rounded-full aspect-square ${size}`

  const [img, setImg] = useState<string>()
  // const [badge, setBadge] = useState({
  //   color: 'bg-gray-400',
  //   title: 'unavailable',
  // })

  useEffect(() => {
    const fetchImage = async () => {
      const imgUrl = await localFilesService.retriveFile(avatarId)
      setImg(imgUrl)
    }
    fetchImage()
  }, [avatarId])
  const badge = {
    color:
      status === UserStatus.Online
        ? 'bg-green'
        : status === UserStatus.Playing
        ? 'bg-orange'
        : 'bg-gray-400',
    title:
      status === UserStatus.Online
        ? 'Online'
        : status === UserStatus.Playing
        ? 'Playing'
        : 'Offline',
  }

  const imageUploader = useRef(document.createElement('input'))
  const handleSetImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return
    else {
      console.log(event.target.files)
      let fd = new FormData()
      fd.append('file', event.target.files[0])
      usersService.uploadFile(fd).then((response) => {
        localStorage.setItem('user', JSON.stringify(response.data))
        setCurrUser && setCurrUser(response.data)
      })
    }
  }
  if (!currUser) {
    if (!noLink) {
      return (
        <div>
          <Link to={'/profile/' + username}>
            <img src={img} className={classes} alt="Profile pic" />{' '}
          </Link>
        </div>
      )
    } else
      return (
        <div className={`flex relative ${size} flex-shrink-0`}>
          <img src={img} className={classes} alt="Profile pic" />
          {addStatus && (
            <span
              className={`inline-flex items-center p-3 mr-1 text-sm font-semibold ${badge.color} rounded-full absolute`}
              title={badge.title}
            />
          )}
        </div>
      )
  }

  return (
    <div className="relative">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleSetImage(e)}
        ref={imageUploader}
        style={{
          display: 'none',
        }}
      />
      <button
        title="Upload Profile Picture"
        className="absolute top-[8%] right-[8%] duration-300 border border-gray bg-white hover:bg-gray h-14 w-14 rounded-full flex items-center justify-center group"
        onClick={() => {
          imageUploader.current.click()
        }}
      >
        <Edit className="h-8 w-8 ease-in-out duration-300 fill-gray group-hover:fill-violet float-right" />
      </button>
      <img src={img} className={classes} alt="Profile pic" />
    </div>
  )
}
