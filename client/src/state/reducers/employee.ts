import {IEmployeeState, ActionsEmployee, ActionTypesEmployee} from '../../types/employeeStore';
import { Employee } from '../../types/employeeStore';

const initialState: {
  employees: Employee [],
  page: number,
  pages: number,
  total: number,
  limit: number
} = {
  employees: [],
  page: 0,
  pages: 0,
  total: 0,
  limit: 2
}

const employee = (state: IEmployeeState = initialState, action: ActionsEmployee): IEmployeeState => {

  switch (action.type) {
    case ActionTypesEmployee.FETCH_EMLOYEE: {

      return {
        ...state,
        ...action.payload
      };
    }

    case ActionTypesEmployee.ADD_EMPLOYEE: {
      return {
        ...state,
        employees: [...state.employees, action.payload]
      };
    }

    case ActionTypesEmployee.UPDATE_EMPLOYEE: {
      const index = state.employees.findIndex((el) => el._id === action.payload._id);

      return {
        ...state,
        employees: [
          ...state.employees.slice(0, index),
          action.payload,
          ...state.employees.slice(index + 1)
        ]
      };
    }

    case ActionTypesEmployee.DELETE_EMPLOYEE: {
      return {
        ...state,
        employees: state.employees.filter((el) => el._id !== action.payload)
      };
    }

    case ActionTypesEmployee.CHANGE_PAGE: {
      return {
        ...state,
        page: action.payload
      };
    }

    case ActionTypesEmployee.CHANGE_LIMIT: {

      return {
        ...state,
        limit: action.payload,
        page: 1
      }
    }

    default:
      return state;
  }
};

export default employee;