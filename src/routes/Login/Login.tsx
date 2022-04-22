import { ErrorMessage, Field, Form, Formik } from 'formik'
import ContentBox from '../../components/ContentBox'
import * as Yup from "yup";
import authenticationService from '../../services/authentication.service';
import { useNavigate } from 'react-router-dom';
import { stat } from 'fs';

export interface LoginProps {
  setConnected: React.Dispatch<React.SetStateAction<boolean>>
}

type State = {
  username: string,
  password: string,
  loading: boolean,
  message: string
}

export function Login({ setConnected }: LoginProps) {

  let state : State = {
    username: "",
    password: "",
    loading: false,
    message: ""
  }

  function handleClick() {
    setConnected(true)
  }

  const initialValues = {
    username: "",
    password: "",
    loading: false,
    message: ""
  };
  let navigate = useNavigate();

  function validationSchema() {
    return Yup.object().shape({
      username: Yup.string().required("This field is required!"),
      password: Yup.string().required("This field is required!")
    });
  }
  function handleLogin(formValue: {username:string, password: string}) {
    const {username, password} = formValue;
    state.message = "";
    state.loading = true;
    console.log(state);
    authenticationService.login(username, password).then(()=> {
      handleClick();
    navigate("/play");
    }, error => {
      const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      //state.loading = false;
      state.message = resMessage;
    });
  }
  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className='max-w-md w-full space-y-8'>
        <div>
          <div className="font-title text-[3rem] text-violet text-center">
            <h1>Transcendence</h1>
          </div>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-black'>Sign in</h2>
          <p className='mt-2 text-center text-sm text-black'>
            Or{' '}
            <a href='register' className='font-medium text-black hover:text-violet'>
              Sign-up from here
            </a>
          </p>
        </div>
        <Formik enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleLogin}>
          <Form className='mt-8 space-y-6'>
            <div className='rounded-md shadow-sm -space-y-px'>
              <div>
                <label htmlFor='username' className='sr-only'>Username</label>
                <Field name="username" type="text" placeholder="Username" className="apperance-none rounded-non relative block w-full px-3 py-2 border-gray placeholder-gray text-black rounded-t-md focus:outline-none focus:ring-violet focus:border-violet" />
                <ErrorMessage name="username" component="div" />
              </div>
              <div>
                <label htmlFor='password' className='sr-only'>Password</label>
                <Field name="password" type="password" placeholder="Password" className="apperance-none rounded-non relative block w-full px-3 py-2 border-gray placeholder-gray text-black rounded-b-md focus:outline-none focus:ring-violet focus:border-violet"/>
                <ErrorMessage name="password" component="div" />
              </div>
            </div>
            <div className='flex items-center justify-between text-sm'>
              <a href='#' className='font-medium text-violet hover:text-violet'>Forgot your password?</a>
            </div>
            <button type='submit' className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-violet' disabled={state.loading}>
              {state.loading && (
                <div className='spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full' role="status">
                  <span className='visually-hidden'>Loading...</span>
                </div>
              )}
              <span>Login {state.loading ? "true" : "false"}</span>
            </button>
          </Form>
        </Formik>
        
          <button onClick={handleClick} className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-zink'>
            <span className='object-cover h-7 w-7'>
              <img src='/images/logo-42-square-reverse.png' alt="42" />
            </span>
            <span>
              Sign in with the intra
            </span>
          </button>
      </div>
    </div>
  )
}
