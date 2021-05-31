import { Employee } from "./employeeStore";

export interface IAddEmployee{
  name: string,
  sex: sexEnum,
  birthday: number,
  contacts: string,
  position: string,
  salary: number
}

export enum sexEnum{
  MALE = 'Male',
  FEMALE = 'Female',
  OTHER = 'Other'
}

export type TEmployee = IAddEmployee | Employee | undefined;

export interface IErrorEmpl{
  name?: string;
  sex?: string;
  birthday?: string;
  contacts?: string; 
  position?: string; 
  salary?: string;
}

export const employeeSex = [sexEnum.FEMALE, sexEnum.MALE, sexEnum.OTHER];