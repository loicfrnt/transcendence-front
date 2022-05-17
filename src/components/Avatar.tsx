import { ChangeEvent, useEffect, useRef, useState } from 'react'
import localFilesService from '../services/local-files.service'
import usersService from '../services/users.service'
import {ReactComponent as Add} from '../assets/add.svg'

interface AvatarProps {
  avatarId: number
  username: string
  noLink?: boolean
  size?: string
}

export default function Avatar({
  avatarId,
  username,
  noLink,
  size = 'h-16 w-16',
}: AvatarProps) {
  const classes = `block bg-cover rounded-full aspect-square ${size}`
  const [state, setState] = useState({
    username : username,
    avatarId : avatarId
  });
  const [img, setImg] = useState<string>();
  useEffect( () =>{
    const fetchImage = async() =>{
      const imgUrl = await localFilesService.retriveFile(state.avatarId);
      setImg(imgUrl);
    };
    fetchImage();
  }, [state.avatarId]);
  const imageUploader = useRef(document.createElement("input"));
  const handleSetImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files)
      return;
    else
    {
      console.log(event.target.files);
      let fd = new FormData();
      fd.append('file', event.target.files[0]);
      usersService.uploadFile(fd).then((response) => {
        console.log(response);
        localStorage.setItem("user", JSON.stringify(response.data));
        setState({
          avatarId: response.data.avatar_id,
          username: response.data.username
        });
      });
    }
  }
  if (!noLink) {
    return (
      <img src={img}  className={classes} alt='Profile pic'/>
    )
  }

  return (
    <div>
      <input
          type="file"
          accept="image/*"
          onChange={e => handleSetImage(e)}
          ref={imageUploader}
          style={{
            display: "none"
          }}
        />
      <Add title='Upload Profile Image' className='ease-in-out duration-300 fill-gray group-hover:fill-violet float-right' onClick={() => {imageUploader.current.click()}}/>
      <img src={img} className={classes} alt='Profile pic'/>
    </div>
  )
}
