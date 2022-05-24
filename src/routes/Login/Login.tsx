import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import authenticationService from '../../services/authentication.service'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import PopUpBox from '../../components/PopUpBox'
import twoFactorsAuthenticationService from '../../services/two-factors-authentication.service'
import MainContainer from '../../components/MainContainer'

export interface LoginProps {
  setConnected: React.Dispatch<React.SetStateAction<boolean>>
}

export function Login({ setConnected }: LoginProps) {
  const [state, setState] = useState({
    username: '',
    password: '',
    loading: false,
    message: '',
  })
  const [stateQr, setStateQr] = useState({
    tfacode: '',
    message: '',
  })
  const [qrClicked, setQrClicked] = useState(false)

  function handleClick() {
    setConnected(true)
  }

  const initialValues = {
    username: '',
    password: '',
    loading: false,
    message: '',
  }
  let navigate = useNavigate()

  function validationSchema() {
    return Yup.object().shape({
      username: Yup.string().required('This field is required!'),
      password: Yup.string().required('This field is required!'),
    })
  }
  function handleLogin(formValue: { username: string; password: string }) {
    const { username, password } = formValue
    setState({
      username: '',
      password: '',
      message: '',
      loading: true,
    })
    authenticationService.login(username, password).then(
      (response) => {
        if (response == '') setQrClicked(true)
        else {
          handleClick()
          navigate('/')
        }
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        setState({
          username: '',
          password: '',
          message: resMessage,
          loading: false,
        })
      }
    )
  }

  const initialValuesQr = {
    tfacode: '',
  }

  function validationSchemaQr() {
    return Yup.object().shape({
      tfacode: Yup.string()
        .required('This field is required!')
        .test(
          'len',
          'The code is a 6 digits number.',
          (val: any) => val && val.toString().length === 6
        ),
    })
  }

  function handleTfaAuthentication(formValue: { tfacode: string }) {
    const { tfacode } = formValue
    twoFactorsAuthenticationService.authenticate(tfacode.toString()).then(
      () => {
        setQrClicked(false)
        handleClick()
        navigate('/')
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        setStateQr({
          tfacode: '',
          message: resMessage,
        })
      }
    )
  }
  return (
    <MainContainer>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <div className="font-title text-[3rem] text-violet text-center">
              <h1>Transcendence</h1>
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-black">
              Sign in
            </h2>
            <p className="mt-2 text-center text-sm text-black">
              Or{' '}
              <a
                href="register"
                className="font-medium text-black hover:text-violet"
              >
                Sign-up from here
              </a>
            </p>
          </div>
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            <Form className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="username" className="sr-only">
                    Username
                  </label>
                  <Field
                    name="username"
                    type="text"
                    placeholder="Username"
                    className="apperance-none rounded-non relative block w-full px-3 py-2 border-gray placeholder-gray text-black rounded-t-md focus:outline-none focus:ring-violet focus:border-violet"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <Field
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="apperance-none rounded-non relative block w-full px-3 py-2 border-gray placeholder-gray text-black rounded-b-md focus:outline-none focus:ring-violet focus:border-violet"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <a
                  href="#"
                  className="font-medium text-violet hover:text-violet"
                >
                  Forgot your password?
                </a>
              </div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-violet"
                disabled={state.loading}
              >
                {state.loading && (
                  <div className="w-7 h-7 border-b-2 border-white rounded-full animate-spin"></div>
                )}
                <span>Login</span>
              </button>
              {state.message && (
                <div
                  className="border border-red text-red px-4 py-3 rounded relative"
                  role="alert"
                >
                  <strong className="font-bold">Holy smokes! </strong>
                  <span className="block sm:inline">{state.message}</span>
                  <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                    <svg
                      className="fill-current h-6 w-6 text-red"
                      role="button"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <title>Close</title>
                      <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                    </svg>
                  </span>
                </div>
              )}
            </Form>
          </Formik>
          <Link to="/ft_login">
            <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-zink">
              <span className="object-cover h-7 w-7">
                <img src="/images/logo-42-square-reverse.png" alt="42" />
              </span>
              <span>Sign in with the intra</span>
            </button>
          </Link>
        </div>
      </div>
      <PopUpBox open={qrClicked} setOpen={setQrClicked}>
        <Formik
          initialValues={initialValuesQr}
          validationSchema={validationSchemaQr}
          onSubmit={handleTfaAuthentication}
        >
          <Form>
            <div className="flex flex-wrap">
              <div className="m-auto">
                <div className="w-full px-3">
                  <label
                    htmlFor="tfacode"
                    className="block uppercase tracking-wide text-gray text-x text-center font-blod mb-2"
                  >
                    Your 2FA Code:{' '}
                  </label>
                  <Field
                    className="appearance-none block w-full bg-gray-200 text-black text-center border border-gray-200 rounded mb-6 leading-tight focus:outline-none focus:bg-white focus:border-violet"
                    name="tfacode"
                    type="number"
                    placeholder="XXXXXX"
                  />
                  <ErrorMessage
                    name="tfacode"
                    component="div"
                    className="text-red"
                  />
                </div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-3 mb-6 border border-transparent text-md font-medium rounded-md text-white bg-violet"
                >
                  Activate
                </button>
                {stateQr.message && (
                  <div
                    className="border border-red text-red px-4 py-3 rounded relative"
                    role="alert"
                  >
                    <strong className="font-bold">Holy smokes! </strong>
                    <span className="block sm:inline">{stateQr.message}</span>
                    <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                      <svg
                        className="fill-current h-6 w-6 text-red"
                        role="button"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <title>Close</title>
                        <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                      </svg>
                    </span>
                  </div>
                )}
              </div>
            </div>
          </Form>
        </Formik>
      </PopUpBox>
    </MainContainer>
  )
}
