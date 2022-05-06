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
import React, { useEffect, useRef, useState } from 'react'
import PopUpBox from '../../components/PopUpBox'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import twoFactorsAuthenticationService from '../../services/two-factors-authentication.service'
import *  as Yup from 'yup';

interface Props {
  user: User
  setConnected: React.Dispatch<React.SetStateAction<boolean>>
}

export default function UserProfile({ user, setConnected }: Props) {
  function logout() {
    setConnected(false);
    localStorage.removeItem("user");
  }
  const [editOpen, setEditOpen] = useState(false);
  const [qrClassDiv, setQrClassDiv] = useState<string>('');
  const [qrClicked, setQrClicked] = useState(false);
  const [tfaOffClicked, settfaOffClicked] = useState(false);
  const [tfaActivated, setTfaActivated] = useState(() =>{
    console.log(user);
   return user.isTwoFactorAuthenticationEnabled
  });
  const [qrInit, setQrInit] = useState(false);
  const [img, setImg] = useState<string>();
  const [stateQr, setStateQr] = useState({
    tfacode : "",
    message : ""
  });
  const initialValues = {

  };

  const initialValuesQr = {
    tfacode : ""
  };

  const initialValuesTfaOff = {
    tfacode : ""
  };

  function validationSchemaQr() {
    return Yup.object().shape({
      tfacode: Yup.string().required("This field is required!").test("len", 
      "The code is a 6 digits number.",
      (val: any) => val && val.toString().length === 6),
    });
  }
  
  function validationSchemaTfaOff() {
    return Yup.object().shape({
      tfacode: Yup.string().required("This field is required!").test("len", 
      "The code is a 6 digits number.",
      (val: any) => val && val.toString().length === 6),
    });
  }

  function handleTfaActivation(formValue: {tfacode: string}) {
    const {tfacode} = formValue;
    twoFactorsAuthenticationService.turnOn(tfacode.toString()).then(() =>{
      setQrClicked(false);
      setQrClassDiv('');
      user.isTwoFactorAuthenticationEnabled = true;
      console.log(user);
      localStorage.setItem("user", JSON.stringify(user));
      setTfaActivated(true);
    }, error => {
      const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      setStateQr({
        tfacode : "",
        message : resMessage
      });
    });
  }

  function handleTfaOff(formValue: {tfacode:string}) {
    const {tfacode} = formValue;
    twoFactorsAuthenticationService.turnOff(tfacode.toString()).then(() =>{
      settfaOffClicked(false);
    }, error => {
      const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      setStateQr({
        tfacode : "",
        message : resMessage
      });
    });
  }

  function validationSchema() {

  }

  function handleUpdate() {

  }

  const checkboxEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked === true) {
      setQrClassDiv('pointer-events-none opacity-20');
      setQrInit(true);
      setQrClicked(true);
    }
    else
      settfaOffClicked(true);

  }
  useEffect( () =>{
    const fetchImage = async() =>{
      const imgUrl = await twoFactorsAuthenticationService.getSecretQr();
      setImg(imgUrl);
    };
    if (qrInit)
    {
      fetchImage();
      setQrInit(false);
    }
  });
  return (
    <MainContainer>
      <PopUpBox open={editOpen} setOpen={setEditOpen}>
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
                <input className="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 mb-3 align-top bg-white bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm focus:accent-violet" type="checkbox" onChange={checkboxEvent} defaultChecked={tfaActivated}/>
              </label>
              </div>
          </div>
        </div>
      </PopUpBox>
      <PopUpBox open={qrClicked} setOpen={setQrClicked}>
        <Formik initialValues={initialValuesQr}
                validationSchema={validationSchemaQr}
                onSubmit={handleTfaActivation}>
          <Form>
            <div className='flex flex-wrap'>
              <div className='md:w-1/2 m-auto'>
                <div className='w-full px-3 mb-6 mb:mb-0'>
                  {qrClicked && <img src={img} alt="Qr Code"/>}
                </div>
              </div>
              <div className='md:w-1/2 m-auto'>
                <div className='w-full px-3'>
                  <label htmlFor='tfacode' className='block uppercase tracking-wide text-gray text-x text-center font-blod mb-2'>Your 2FA Code: </label>
                  <Field className='appearance-none block w-full bg-gray-200 text-black text-center border border-gray-200 rounded mb-6 leading-tight focus:outline-none focus:bg-white focus:border-violet'name='tfacode' type='number' placeholder='XXXXXX' />
                  <ErrorMessage name="tfacode" component="div" className='text-red'/>
                </div>
                <button type='submit' className='group relative w-full flex justify-center py-2 px-3 mb-6 border border-transparent text-md font-medium rounded-md text-white bg-violet'>Activate</button>
                {stateQr.message && (
                <div className="border border-red text-red px-4 py-3 rounded relative" role="alert">
                  <strong className="font-bold">Holy smokes! {' '}</strong>
                  <span className="block sm:inline">{stateQr.message}</span>
                  <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                    <svg className="fill-current h-6 w-6 text-red" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                  </span>
                </div>
            )}
              </div>
            </div>
          </Form>
        </Formik>
      </PopUpBox>
      <PopUpBox open={tfaOffClicked} setOpen={settfaOffClicked}>
    <Formik initialValues={initialValuesTfaOff}
            validationSchema={validationSchemaTfaOff}
            onSubmit={handleTfaOff}>
      <Form>
        <div className='flex flex-wrap'>
          <div className='m-auto'>
            <div className='w-full px-3'>
              <label htmlFor='tfacode' className='block uppercase tracking-wide text-gray text-x text-center font-blod mb-2'>Your 2FA Code: </label>
              <Field className='appearance-none block w-full bg-gray-200 text-black text-center border border-gray-200 rounded mb-6 leading-tight focus:outline-none focus:bg-white focus:border-violet'name='tfacode' type='number' placeholder='XXXXXX' />
              <ErrorMessage name="tfacode" component="div" className='text-red'/>
            </div>
            <button type='submit' className='group relative w-full flex justify-center py-2 px-3 mb-6 border border-transparent text-md font-medium rounded-md text-white bg-violet'>Deactivate</button>
            {stateQr.message && (
            <div className="border border-red text-red px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Holy smokes! {' '}</strong>
              <span className="block sm:inline">{stateQr.message}</span>
              <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg className="fill-current h-6 w-6 text-red" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
              </span>
            </div>
        )}
          </div>
        </div>
      </Form>
    </Formik>
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
