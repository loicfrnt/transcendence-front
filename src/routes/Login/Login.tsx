import { ErrorMessage, Field, Form, Formik } from 'formik'
import ContentBox from '../../components/ContentBox'
import * as Yup from "yup";
import authenticationService from '../../services/authentication.service';
import { useNavigate } from 'react-router-dom';

export interface LoginProps {
  setConnected: React.Dispatch<React.SetStateAction<boolean>>
}

export function Login({ setConnected }: LoginProps) {
  function handleClick() {
    setConnected(true)
  }

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
  function handleLogin(formValue: {username:string, password: string}) {
    const {username, password} = formValue;
    authenticationService.login(username, password).then(()=> {
      handleClick();
    navigate("/play");
    }, error => {
      const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      
    });
  }
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-10">
      <div className="font-title text-[3rem] text-violet text-center">
        <h2>Welcome to</h2>
        <h1 className="text-[5rem]">Transcendence</h1>
      </div>
      <Formik initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleLogin}>

        <Form>
          <div>
            <label htmlFor='username'>Username</label>
            <Field name="username" type="text" />
            <ErrorMessage name="username" component="div" />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <Field name="password" type="password" />
            <ErrorMessage name="password" component="div" />
          </div>
          <button type='submit'>Login</button>
        </Form>
      </Formik>
      <ContentBox button handleClick={() => handleClick()}>
        <p className="font-semibold text-[2rem] m-3 ease-in-out duration-300 group-hover:text-white">
          Sign in with 42's API
        </p>
      </ContentBox>
    </div>
  )
}
