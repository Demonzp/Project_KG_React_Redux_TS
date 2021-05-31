import { IinitialStateSignup } from '../types/signup';
import { emailRuls, passRuls } from './global';

const loginNumChars:number = 3;

type loginType = {
  login?:string
};

const loginRuls = (values:loginType)=>{
  const errors: loginType = {};

  if (!values.login) {
      errors.login = 'Password is required';
  } else if (values.login.length < loginNumChars) {
      errors.login = `Password needs to be equal or more than ${loginNumChars} characters`;
  }
  
  return errors;
}

export const signupValidation = (values:IinitialStateSignup) => {
    return {
      ...emailRuls(values),
      ...passRuls(values),
      ...loginRuls(values)
    };
}