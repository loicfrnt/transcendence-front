import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from "yup";
import authenticationService from '../../services/authentication.service';
import { useNavigate } from 'react-router-dom';


export function Register() {

  const initialValues = {
    username: "",
    password: ""
  };
  let navigate = useNavigate();

  function validationSchema() {
    return Yup.object().shape({
      username: Yup.string().required("This field is required!"),
      password: Yup.string().required("This field is required!")
    });
  }
  function handleRegister(formValue: {username:string, password: string}) {
    const {username, password} = formValue;
    authenticationService.login(username, password).then(()=> {
    navigate("/play");
    }, error => {
      const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      
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
                <ErrorMessage name="username" component="div" />
              </div>
              <div>
                <label htmlFor='email' className='sr-only'>Email</label>
                <Field name="email" type="text" placeholder="Email" className="apperance-none rounded-non relative block w-full px-3 py-2 border-gray placeholder-gray text-black rounded mb-4 focus:outline-none focus:ring-violet focus:border-violet" />
                <ErrorMessage name="email" component="div" />
              </div>
              <div>
                <label htmlFor='password' className='sr-only'>Password</label>
                <Field name="password" type="password" placeholder="Password" className="apperance-none rounded-non relative block w-full px-3 py-2 border-gray placeholder-gray text-black rounded mb-4 focus:outline-none focus:ring-violet focus:border-violet"/>
                <ErrorMessage name="password" component="div" />
              </div>
              <div>
                <label htmlFor='confirm_password' className='sr-only'>Confirm password</label>
                <Field name="confirm_password" type="password" placeholder="Confirm Password" className="apperance-none rounded-non relative block w-full px-3 py-2 border-gray placeholder-gray text-black rounded mb-4 focus:outline-none focus:ring-violet focus:border-violet"/>
                <ErrorMessage name="confirm_password" component="div" />
              </div>
            </div>
            <button type='submit' className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-violet'>Sign up</button>
          </Form>
        </Formik>
      </div>
    </div>
  )
}
