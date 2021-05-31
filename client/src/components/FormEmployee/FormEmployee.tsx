import { Form, FormGroup, FormFeedback, Input, Label } from 'reactstrap';
import UseValidationForm from '../../hooks/useValidationForm';
import { employeeValidation } from '../../validations/employeeValidation';
import { useEffect } from 'react';
import { IErrorEmpl, employeeSex, TEmployee, IAddEmployee } from '../../types/employee';
import { Employee } from '../../types/employeeStore';

type Props = {
  employee: TEmployee;
  handleSubmit?: (v?:Employee | IAddEmployee)=>void;
  isSubmit?: boolean;
}

const FormEmployee: React.FC<Props> = ({ employee, handleSubmit = () => { }, isSubmit }) => {

  const { handleSubmit: handleSubmitForm, values, handleChange, validErrors } = UseValidationForm<TEmployee, IErrorEmpl>(
    () => handleSubmit(values),
    employee,
    employeeValidation,
    () => handleSubmit()
  );

  useEffect(() => {
    if (isSubmit) {
      handleSubmitForm();
    }
  }, [isSubmit]);

  const isError = (err: IErrorEmpl | object, key: string) => {
    if (Object.keys(err).length > 0 && key in err) {
      return true;
    }
    return false;
  };

  return (
    <Form>
      <FormGroup>
        <Label for='name'>Name:</Label>
        <Input
          name='name'
          invalid={isError(validErrors, 'name') && true}
          value={(values as Employee).name}
          onChange={handleChange}
          placeholder='John Smith'
        />
        {isError(validErrors, 'name') && <FormFeedback>{(validErrors as IErrorEmpl).name}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <Label for='sex'>Sex:</Label>
        <Input
          type='select'
          name='sex'
          value={(values as Employee).sex}
          invalid={isError(validErrors, 'sex') && true}
          onChange={handleChange}
        >
          {
            employeeSex.map((sex, index) => {
              return <option key={index} >{sex}</option>
            })
          }
        </Input>
        {isError(validErrors, 'sex') && <FormFeedback>{(validErrors as IErrorEmpl).sex}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <Label for='birthday'>Birthday:</Label>
        <Input
          type='date'
          name='birthday'
          value={(values as Employee).birthday}
          invalid={isError(validErrors, 'birthday') && true}
          onChange={handleChange}
        />
        {isError(validErrors, 'birthday') && <FormFeedback>{(validErrors as IErrorEmpl).birthday}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <Label for='contacts'>Contacts:</Label>
        <Input
          type='textarea'
          name='contacts'
          value={(values as Employee).contacts}
          onChange={handleChange}
          invalid={isError(validErrors, 'contacts') && true}
        />
        {isError(validErrors, 'contacts') && <FormFeedback>{(validErrors as IErrorEmpl).contacts}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <Label for='position'>Position:</Label>
        <Input
          name='position'
          value={(values as Employee).position}
          onChange={handleChange}
          invalid={isError(validErrors, 'contacts') && true}
          placeholder='manager'
        />
        {isError(validErrors, 'contacts') && <FormFeedback>{(validErrors as IErrorEmpl).position}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <Label for='salary'>Salary:</Label>
        <Input
          name='salary'
          value={(values as Employee).salary}
          onChange={handleChange}
          invalid={isError(validErrors, 'salary') && true}
          placeholder='1000.00'
        />
        {isError(validErrors, 'salary') && <FormFeedback>{(validErrors as IErrorEmpl).salary}</FormFeedback>}
      </FormGroup>
    </Form>
  );
};

export default FormEmployee;