import { ChangeEvent, useEffect, useRef, useState } from 'react'
import localFilesService from '../services/local-files.service'
import usersService from '../services/users.service'
import { ReactComponent as Add } from '../assets/add.svg'
import { UserStatus } from '../types/user'
import { Link } from 'react-router-dom'

interface AvatarProps {
  avatarId: number
  username: string
  withStatus?: boolean
  size?: string
  status: UserStatus
  addStatus?: boolean
  noLink?: boolean
}

export default function Avatar({
  avatarId,
  username,
  withStatus = false,
  size = 'h-16 w-16',
  status,
  noLink = true,
  addStatus = false,
}: AvatarProps) {
  const classes = `block bg-cover rounded-full aspect-square ${size}`
  // const [state, setState] = useState({
  //   username : username,
  //   avatarId : avatarId,
  //   status: status
  // });
  const [img, setImg] = useState<string>()
  const [badge, setBadge] = useState({
    color: 'bg-gray-400',
    title: 'unavailable',
  })
  // useEffect(() =>{
  //   setState({
  //     username : username,
  //     avatarId : avatarId,
  //     status: status
  //   });
  // }, [status]);
  useEffect(() => {
    const fetchImage = async () => {
      const imgUrl = await localFilesService.retriveFile(avatarId)
      setImg(imgUrl)
    }
    fetchImage()
  }, [avatarId])
  useEffect(() => {
    if (status === UserStatus.Online) {
      setBadge({
        color: 'bg-green',
        title: 'connected',
      })
    } else if (status === UserStatus.Playing) {
      setBadge({
        color: 'bg-orange',
        title: 'Playing',
      })
    } else {
      setBadge({
        color: 'bg-gray-400',
        title: 'unavailable',
      })
    }
  }, [status])
  const imageUploader = useRef(document.createElement('input'))
  const handleSetImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return
    else {
      console.log(event.target.files)
      let fd = new FormData()
      fd.append('file', event.target.files[0])
      usersService.uploadFile(fd).then((response) => {
        localStorage.setItem('user', JSON.stringify(response.data))
        // setState({
        //   avatarId: response.data.avatar_id,
        //   username: response.data.username,
        //   status: response.data.status,
        // })
      })
    }
  }
  if (!withStatus) {
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
        <div className="flex relative">
          <img src={img} className={classes} alt="Profile pic" />
          {addStatus && (
            <span
              className={`inline-flex items-center p-3 mr-1 text-sm font-semibold ${badge.color} rounded-full absolute`}
              title={badge.title}
            ></span>
          )}
        </div>
      )
  }

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleSetImage(e)}
        ref={imageUploader}
        style={{
          display: 'none',
        }}
      />
      <Add
        title="Upload Profile Image"
        className="ease-in-out duration-300 fill-gray group-hover:fill-violet float-right"
        onClick={() => {
          imageUploader.current.click()
        }}
      />
      <img src={img} className={classes} alt="Profile pic" />
    </div>
  )
}
