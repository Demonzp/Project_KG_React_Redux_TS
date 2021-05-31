import { AppThunk } from '../store';
import { IActionAddUpdateEmployee, IActionChangePage, IActionFetchEmployee, ActionTypesEmployee, Employee, IActionDeleteEmployee, IActionChangeLimit } from '../../types/employeeStore';
import AxiosService from '../../services/axiosService';
import { routeNames } from '../../types/routeNames';
import { IAddEmployee } from '../../types/employee';

const axiosService = AxiosService.getInstance();

export const fetchEmployee: AppThunk = async (dispatch, getState) => {
  const limit = getState().employee.limit;
  const page = getState().employee.page;

  try {
    if (!axiosService.userAxios) {
      throw new Error('not Authorizad!');
    }

    const res = await axiosService.userAxios.get<{doc:Employee[], page:number, pages:number, total:number}>(`${routeNames.EMPLOYEES}?limit=${limit}&page=${page}`);

    dispatch<IActionFetchEmployee>({
      type: ActionTypesEmployee.FETCH_EMLOYEE,
      payload: {
        employees: res.data.doc,
        page: res.data.page,
        pages: res.data.pages,
        total: res.data.total
      }
    });
  } catch (error) {
    console.error(error);
  }
};

export const changePage = (page: number): AppThunk => (dispatch) => {
  dispatch<IActionChangePage>({ type: ActionTypesEmployee.CHANGE_PAGE, payload: page });
  dispatch(fetchEmployee);
};

export const changeLimit = (limit: number): AppThunk =>(dispatch, getState)=>{
  const total = getState().employee.total;
  const prevLimit = getState().employee.limit;

  dispatch<IActionChangeLimit>({type: ActionTypesEmployee.CHANGE_LIMIT, payload:limit});
  if(total>prevLimit || total>limit){
    dispatch(fetchEmployee);
  }
}

export const addEmployee = (values: IAddEmployee): AppThunk<Promise<boolean | Error>> => async (dispatch): Promise<boolean | Error> => {

  try {
    if (!axiosService.userAxios) {
      throw new Error('not Authorizad');
    }

    await axiosService.userAxios.post(routeNames.EMPLOYEES, values);
    dispatch(fetchEmployee);
    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editEmployee = (values: Employee): AppThunk<Promise<boolean | Error>> => async (dispatch): Promise<boolean | Error> => {
  try {

    if (!axiosService.userAxios) {
      throw new Error('not Authorizad!');
    }

    const res = await axiosService.userAxios.put<Employee>(routeNames.EMPLOYEES + values._id, {
      name: values.name,
      sex: values.sex,
      birthday: values.birthday,
      contacts: values.contacts,
      position: values.position,
      salary: values.salary,
    });

    dispatch<IActionAddUpdateEmployee>({ type: ActionTypesEmployee.UPDATE_EMPLOYEE, payload: res.data });
    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteEmployee = (_id: string): AppThunk<Promise<void>> => async (dispatch, getState): Promise<void> => {
  const page = getState().employee.page;
  const pages = getState().employee.pages;
  const numEmployees = getState().employee.employees.length;

  try {
    if (!axiosService.userAxios) {
      throw new Error('not Authorizad!');
    }
    await axiosService.userAxios.delete(routeNames.EMPLOYEES + _id);

    if (page !== pages) {
      dispatch(fetchEmployee);
    } else {
      if (numEmployees - 1 <= 0) {
        dispatch<IActionChangePage>({ type: ActionTypesEmployee.CHANGE_PAGE, payload: page - 1 });
      } else {
        dispatch<IActionDeleteEmployee>({ type: ActionTypesEmployee.DELETE_EMPLOYEE, payload: _id });
      }
    }
  } catch (error) {
    console.error(error);
  }
};