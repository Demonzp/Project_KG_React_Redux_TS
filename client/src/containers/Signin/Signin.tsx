import React from 'react';
import { Button, Card, CardBody, CardHeader, Form, FormGroup, FormFeedback, Input, Label } from 'reactstrap';

import useAuth from '../../hooks/useAuth';

import UseValidationForm from '../../hooks/useValidationForm';
import signinValidation from '../../validations/signinValidation';
import { IinitialStateSignin, IError } from '../../types/signin';

const initState: IinitialStateSignin = {
  email: '',
  password: ''
}

const Signin: React.FC = () => {
  const { signin } = useAuth();

  const submitUserHandler = () => {
    signin(values);
  };

  const { handleSubmit, values, handleChange, validErrors } = UseValidationForm<IinitialStateSignin, IError>(
    submitUserHandler,
    initState,
    signinValidation
  );

  const isError = (err: IError | object, key: string) => {
    if (Object.keys(err).length > 0 && key in err) {
      return true;
    }
    return false;
  };

  ////////////////// RENDER ///////////////////

  return (
    <React.Fragment>
      <br />
      <Card outline color='secondary'>
        <CardHeader>
          <h1>Authorization</h1>
          Please fill the fields below:
        </CardHeader>
        <CardBody>
          <Form>
            <FormGroup>
              <Label for='email'>E-mail:</Label>
              <Input
                type='email'
                name='email'
                invalid={isError(validErrors, 'email') && true}
                value={values.email}
                onChange={handleChange}
                placeholder='example@gmail.com'
              />
              {isError(validErrors, 'email') && <FormFeedback>{(validErrors as IError).email}</FormFeedback>}
            </FormGroup>
            <FormGroup>
              <Label for='password'>Password:</Label>
              <Input
                invalid={isError(validErrors, 'password') && true}
                type='password'
                name='password'
                value={values.password}
                onChange={handleChange}
              />
              {isError(validErrors, 'password') && <FormFeedback>{(validErrors as IError).password}</FormFeedback>}
            </FormGroup>
            <br />
            <Button outline color='success' onClick={(e) => handleSubmit(e)}>SUBMIT</Button>
          </Form>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default Signin;