import { IErrorEmpl, TEmployee } from "../types/employee";
import { Employee } from "../types/employeeStore";

const numNameChars = 2;

export const employeeValidation = (values: TEmployee) => {
  const errors: IErrorEmpl = {};

  if (!(values as Employee).name) {
    errors.name = 'Name is required';
  } else if ((values as Employee).name.length < numNameChars) {
    errors.name = 'Name is invalid';
  }

  if (!(values as Employee).sex) {
    errors.sex = 'Sex is required';
  }

  if (!(values as Employee).birthday || (values as Employee).birthday.toString().length < 1) {
    errors.birthday = 'Birthday is required';
  }

  if (!(values as Employee).contacts || (values as Employee).contacts.length < 1) {
    errors.contacts = 'Contacts is required';
  }

  if (!(values as Employee).position || (values as Employee).position.length < 1) {
    errors.position = 'Position is required';
  }

  if (!(values as Employee).salary || (values as Employee).salary.toString().length < 1) {
    errors.salary = 'Salary is required';
  }


  return errors;
}