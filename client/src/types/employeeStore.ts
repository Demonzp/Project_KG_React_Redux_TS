import { sexEnum } from "./employee";

export type Employee = {
  _id: string,
  name: string,
  sex: sexEnum,
  birthday: number,
  contacts: string,
  position: string,
  salary: number
}

export interface IEmployeeState {
  employees: Employee[];
  page: number;
  pages: number;
  total: number;
  limit: number;
}

export enum ActionTypesEmployee {
  FETCH_EMLOYEE = 'FETCH_EMLOYEE',
  ADD_EMPLOYEE = 'ADD_EMPLOYEE',
  UPDATE_EMPLOYEE = 'UPDATE_EMPLOYEE',
  DELETE_EMPLOYEE = 'DELETE_EMPLOYEE',
  CHANGE_PAGE = 'CHANGE_PAGE',
  CHANGE_LIMIT = 'CHANGE_LIMIT'
}

export interface IActionFetchEmployee {
  type: ActionTypesEmployee.FETCH_EMLOYEE;
  payload: {
    employees: Employee[];
    page: number;
    pages: number;
    total: number;
  };
}

export interface IActionAddUpdateEmployee {
  type: ActionTypesEmployee.ADD_EMPLOYEE | ActionTypesEmployee.UPDATE_EMPLOYEE;
  payload: Employee
}

export interface IActionDeleteEmployee {
  type: ActionTypesEmployee.DELETE_EMPLOYEE;
  payload: string
}

export interface IActionChangePage {
  type: ActionTypesEmployee.CHANGE_PAGE;
  payload: number
}

export interface IActionChangeLimit {
  type: ActionTypesEmployee.CHANGE_LIMIT;
  payload: number
}

export type ActionsEmployee = IActionFetchEmployee | IActionAddUpdateEmployee | IActionDeleteEmployee | IActionChangePage | IActionChangeLimit;