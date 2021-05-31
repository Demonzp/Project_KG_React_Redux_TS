import React from 'react';
import { Button, Card, CardBody, CardHeader, Form, FormGroup, FormFeedback, Input, Label } from 'reactstrap';
import useAuth from '../../hooks/useAuth';
import UseValidationForm from '../../hooks/useValidationForm';
import { IErrorSignup, IinitialStateSignup } from '../../types/signup';
import { signupValidation } from '../../validations/signupValidation';

const initState: IinitialStateSignup = { login: '', email: '', password: '' };

const Signup: React.FC = () => {

  const { signup } = useAuth();

  const submitUserHandler = () => {
    //console.log('values = ', values);
    signup(values);
  };

  const { handleSubmit, values, handleChange, validErrors } = UseValidationForm<IinitialStateSignup, IErrorSignup>(
    submitUserHandler,
    initState,
    signupValidation
  );

  const isError = (err: IErrorSignup | object, key: string) => {
    if (Object.keys(err).length > 0 && key in err) {
      return true;
    }
    return false;
  };

  return (
    <React.Fragment>
      <br />
      <Card outline color='secondary'>
        <CardHeader>
          <h1>Registration</h1>
          Please fill the fields below:
        </CardHeader>
        <CardBody>
          <Form>
            <FormGroup>
              <Label for='login'>Login:</Label>
              <Input
                name='login'
                value={values.login}
                invalid={isError(validErrors, 'login') && true}
                onChange={handleChange}
              />
              {isError(validErrors, 'login') && <FormFeedback>{(validErrors as IErrorSignup).login}</FormFeedback>}
            </FormGroup>
            <FormGroup>
              <Label for='email'>E-mail:</Label>
              <Input
                type='email'
                name='email'
                value={values.email}
                invalid={isError(validErrors, 'email') && true}
                onChange={handleChange}
                placeholder='example@gmail.com'
              />
              {isError(validErrors, 'email') && <FormFeedback>{(validErrors as IErrorSignup).email}</FormFeedback>}
            </FormGroup>
            <FormGroup>
              <Label for='password'>Password:</Label>
              <Input
                type='password'
                name='password'
                invalid={isError(validErrors, 'password') && true}
                value={values.password}
                onChange={handleChange}
              />
              {isError(validErrors, 'password') && <FormFeedback>{(validErrors as IErrorSignup).password}</FormFeedback>}
            </FormGroup>
            <br />
            <Button outline color='success' onClick={handleSubmit}>SUBMIT</Button>
          </Form>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default Signup;