// TMP static vars
import { userList } from '../../data/users'

import MainContainer from '../../components/MainContainer'
import { User } from '../../types/user'
import MainUser from './MainUser'
import ProfileMasonry from './ProfileMasonry'
import SocialButton from './SocialButton'
import Friends from './Friends'
import MatchHistory from './MatchHistory'
import FriendRequests from './FriendRequests'
import Blocked from './Blocked'
import React, { useEffect, useState } from 'react'
import PopUpBox from '../../components/PopUpBox'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import localFilesService from '../../services/local-files.service'

interface Props {
  user: User
  setConnected: React.Dispatch<React.SetStateAction<boolean>>
}

export default function UserProfile({ user, setConnected }: Props) {
  function logout() {
    setConnected(false)
  }
  const [editOpen, setEditOpen] = useState(false);
  const [qrClassDiv, setQrClassDiv] = useState<string>('');
  const [qrClicked, setQrClicked] = useState(false);
  const initialValues = {

  };

  function validationSchema() {

  }

  function handleUpdate() {

  }

  const checkboxEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    alert(event.target.checked);
    if (event.target.checked === true) {
      setQrClassDiv('pointer-events-none opacity-20');
      setQrClicked(true);
    }

  }

  const [img, setImg] = useState<string>();

  useEffect( () =>{
    const fetchImage = async() =>{
      const imgUrl = await localFilesService.retriveFile(1);
      setImg(imgUrl);
    };
    fetchImage();
  }, []);
  return (
    <MainContainer>
      <PopUpBox open={editOpen} setOpen={setEditOpen}>

      {qrClicked && <img src={img} alt="your image name " />}
        <div className={qrClassDiv}>
          <Formik initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleUpdate}>
          <Form className='w-full max-w-lg'>
            <div className='flex flex-wrap -mx-3 mb-6'>
              <div className='w-full md:w-1/3 px-3 mb-6 mb:mb-0'>
                <label htmlFor='username' className='block uppercase tracking-wide text-gray-700 text-x font-blod mb-2'>Username</label>
                <Field className='appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-violet'name='username' type='text' placeholder='Mohamed' />
              </div>
              <div className='w-full md:w-2/3 px-3'>
                <label htmlFor='email' className='block uppercase tracking-wide text-gray text-x font-blod mb-2'>Email</label>
                <Field className='appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-violet'name='email' type='text' placeholder='Mohamed@bouz.mouk' />
              </div>
            </div>
            <div className='flex flex-wrap -mx-3 mb-6'>
              <div className='w-full md:w-1/2 px-3 mb-6 mb:mb-0'>
                <label htmlFor='password' className='block uppercase tracking-wide text-gray-700 text-x font-blod mb-2'>Password</label>
                <Field name="password" type="password" placeholder="Password" className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-violet"/>
                <ErrorMessage name="password" component="div" className='text-red'/>
              </div>
              <div className='w-full md:w-1/2 px-3 mb-6 mb:mb-0'>
                <label htmlFor='confirm_password' className='block uppercase tracking-wide text-gray-700 text-x font-blod mb-2'>Confirm password</label>
                <Field name="confirm_password" type="password" placeholder="Confirm Password" className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-violet"/>
                <ErrorMessage name="confirm_password" component="div" className='text-red'/>
              </div>
            </div>
          </Form>
          </Formik>
          <div className='flex flex-wrap -mx-3 mb-6'>
              <div className="form-check form-switch w-full md:w1/2 px-12 mb-6 mb:mb-0">
              <label className="form-check-label inline-block text-gray-800"> Activate Two Factors Authentication
                <input className="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 mb-3 align-top bg-white bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm focus:accent-violet" type="checkbox" onChange={checkboxEvent}/>
              </label>
              </div>
          </div>
        </div>
      </PopUpBox>
      <ProfileMasonry>
        <MainUser user={user}>
          <SocialButton content="Log Out" handleClick={(e) => logout()} />
          <SocialButton content="Edit" handleClick={(e) => setEditOpen(true)} />
        </MainUser>
        <Friends />
        <MatchHistory user={user} />
        <FriendRequests requests={userList} />
        <Blocked blocked={[userList[1]]} />
      </ProfileMasonry>
    </MainContainer>
  )
}
