import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from "yup";
import authenticationService from '../../services/authentication.service';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import UsersService from '../../services/users.service'

export function Register() {

  const cookies = new Cookies();
  const userCookie = cookies.get("user");
  useEffect(()=>{

  },[])

  const [state, setState] = useState({
    username: userCookie ? userCookie.username : "",
    email: userCookie ? userCookie.email : "",
    password: "",
    intra_id: userCookie ? userCookie.intra_id : "",
    message: ""
  });
  const initialValues = {
    username: state.username,
    email: state.email,
    password: "",
    confirm_password: ""
  };
  let navigate = useNavigate();

  function validationSchema() {
    return Yup.object().shape({
      email: Yup.string()
        .email('This is not a valid email.')
        .test('Unique Email', 'Email already in use', function (value) {
          return new Promise((resolve, reject) => {
            UsersService.checkIfEmailExists(value).then(
              () => {
                resolve(true)
              },
              (error) => {
                resolve(false)
              }
            )
          })
        }),
      username: Yup.string()
        .min(3, 'This field must be at least 3 characters!')
        .max(20, 'This field must be less 20 characters!')
        .test('Unique Username', 'Username already in use', function (value) {
          return new Promise((resolve, reject) => {
            UsersService.checkIfUsernameExists(value).then(
              () => {
                resolve(true)
              },
              (error) => {
                resolve(false)
              }
            )
          })
        }),
      password: Yup.string()
        .min(8, 'Password must have at east 8 characters!')
        .max(40, 'Password must have less then 40 characters!'),
      confirm_password: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match!')
        .when('password', (password, schema) => {
          if (password !== undefined) return schema.required('field required!')
        }),
    })
  }
  function handleRegister(formValue: {username:string, email: string, password: string}) {
    const {username, email, password} = formValue;
    setState({
      username: "",
      email: "",
      password: "",
      intra_id: state.intra_id,
      message: ""
    });
    authenticationService.register(username,email, password, state.intra_id).then(()=> {
    navigate("/login");
    setState({
      username: "",
      email: "",
      password: "",
      intra_id: "",
      message: ""
    });
    }, error => {
      const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      setState({
        username: "",
        email: "",
        password: "",
        intra_id: "",
        message: resMessage
      });
    });
  }
  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className='max-w-md w-full space-y-8'>
        <div>
          <div className="font-title text-[3rem] text-violet text-center">
            <h1>Transcendence</h1>
          </div>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-black'>Sign up</h2>
          <p className='mt-2 text-center text-sm text-black'>
            Or{' '}
            <a href='/' className='font-medium text-black hover:text-violet'>
              Sign-in from here
            </a>
          </p>
        </div>
        <Formik initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleRegister}>
          <Form className='mt-8 space-y-6'>
            
            <div className='rounded-md shadow-sm -space-y-px'>
              <div>
                <label htmlFor='username' className='sr-only'>Username</label>
                <Field name="username" type="text" placeholder="Username" className="apperance-none rounded-non relative block w-full px-3 py-2 border-gray placeholder-gray text-black rounded mb-4 focus:outline-none focus:ring-violet focus:border-violet" />
                <ErrorMessage name="username" component="div" className='text-red'/>
              </div>
              <div>
                <label htmlFor='email' className='sr-only'>Email</label>
                <Field name="email" type="text" placeholder="Email" className="apperance-none rounded-non relative block w-full px-3 py-2 border-gray placeholder-gray text-black rounded mb-4 focus:outline-none focus:ring-violet focus:border-violet" />
                <ErrorMessage name="email" component="div" className='text-red'/>
              </div>
              <div>
                <label htmlFor='password' className='sr-only'>Password</label>
                <Field name="password" type="password" placeholder="Password" className="apperance-none rounded-non relative block w-full px-3 py-2 border-gray placeholder-gray text-black rounded mb-4 focus:outline-none focus:ring-violet focus:border-violet"/>
                <ErrorMessage name="password" component="div" className='text-red'/>
              </div>
              <div>
                <label htmlFor='confirm_password' className='sr-only'>Confirm password</label>
                <Field name="confirm_password" type="password" placeholder="Confirm Password" className="apperance-none rounded-non relative block w-full px-3 py-2 border-gray placeholder-gray text-black rounded mb-4 focus:outline-none focus:ring-violet focus:border-violet"/>
                <ErrorMessage name="confirm_password" component="div" className='text-red'/>
              </div>
            </div>
            <button type='submit' className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-violet'>Sign up</button>
            {state.message && (
              <div className="border border-red text-red px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Holy smokes! {' '}</strong>
                <span className="block sm:inline">{state.message}</span>
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                  <svg className="fill-current h-6 w-6 text-red" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                </span>
              </div>
            )}
          </Form>
        </Formik>
      </div>
    </div>
  )
}
