import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FileWatcherEventKind } from 'typescript'
import localFilesService from '../services/local-files.service'

interface AvatarProps {
  avatarId: number
  username: string
  noLink?: boolean
  size?: string
}

export default function Avatar({
  avatarId,
  username,
  noLink = false,
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
      const imgUrl = await localFilesService.retriveFile(avatarId);
      setImg(imgUrl);
    };
    fetchImage();
  }, []);

  if (!noLink) {
    return (
      <Link to={'/profile/' + state.username}><img src={img}  className={classes}/></Link>
    )
  }
  return (
    <img src={img} className={classes}/>
  )
}
