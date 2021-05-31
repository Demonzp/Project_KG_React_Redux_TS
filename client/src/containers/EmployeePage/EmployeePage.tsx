import React, { useState } from 'react';
import { Button, Table } from 'reactstrap';
import { useDispatch } from 'react-redux';

import FormEmployee from '../../components/FormEmployee';
import CustomModal from '../../components/CustomModal/CustomModal';
import SimplePaginator from '../../components/SimplePaginator';

import SimplePaginLimit from '../../components/SimplePaginLimit';
import { useAppSelector, useThunkDispatch } from '../../hooks/useStore';
import { IAddEmployee, sexEnum, TEmployee } from '../../types/employee';
import { Employee } from '../../types/employeeStore';
import { addEmployee, changeLimit, changePage, deleteEmployee, editEmployee } from '../../state/actions/employee';

const EmployeePage: React.FC = () => {
  const { employees, pages, page, limit } = useAppSelector(state => state.employee);
  const dispatch = useDispatch();
  const thunkDispatch = useThunkDispatch();

  const [selectEmployee, setSelectEmployee] = useState<TEmployee>();

  const [createEmployeeModal, setCreateEmployeeModal] = useState(false);
  const [editEmployeeModal, setEditEmployeeModal] = useState(false);

  const toggleCreateEmployeeModal = () => setCreateEmployeeModal(!createEmployeeModal);
  const toggleEditEmployeeModal = () => setEditEmployeeModal(!editEmployeeModal);

  // POST
  const addEmployeeHandler = async (values: IAddEmployee) => {
    try {
      await dispatch(addEmployee(values));
      toggleCreateEmployeeModal();
    } catch (error) {
      console.error(error);
    }

  };

  // PUT
  const updateEmployeeHandler = async (vals: Employee) => {
    try {
      await thunkDispatch(editEmployee(vals));
      toggleEditEmployeeModal();
    } catch (error) {
      console.error(error);
    }
  };

  const editEmployeeHandler = (_id:string) => {
    try {
      const employee = employees.find((el) => el._id === _id);
      setSelectEmployee(employee);
      toggleEditEmployeeModal();
    } catch (err) {
      console.error(err);
    };
  };

  // DELETE
  const deleteEmployeeHandler = async (_id:string) => {
    await dispatch(deleteEmployee(_id));
  };

  const onPage = (p:number) => {
    dispatch(changePage(p));
  };

  const handlerChangeLimit = (l:number) => {
    dispatch(changeLimit(l));
  };

  ////////////////// RENDER ///////////////////

  return (
    <div className='App container'>
      <br />
      <h1>List of Employees</h1>
      <br />
      <Button color='success' outline onClick={toggleCreateEmployeeModal}>ADD NEW EMPLOYEE</Button>
      <br />
      <br />
      <CustomModal
        modal={editEmployeeModal}
        toggleModal={toggleEditEmployeeModal}
        modalHandler={updateEmployeeHandler}
        textHeader='Edit Employee: '
        textSubmit='Edit'
      >
        <FormEmployee employee={selectEmployee} />
      </CustomModal>
      <CustomModal
        modal={createEmployeeModal}
        toggleModal={toggleCreateEmployeeModal}
        modalHandler={addEmployeeHandler}
        textHeader='Add Employee: '
        textSubmit='Add'
      >
        <FormEmployee
          employee={{name: '', sex: sexEnum.MALE, birthday: 0, contacts: '', position: '', salary: 0 }}
        />
      </CustomModal>
      <SimplePaginLimit arrLimit={[2, 3, 5, 10, 20]} onChange={handlerChangeLimit} forceLimit={limit} />
      <SimplePaginator onPage={onPage} pages={pages} forcePage={page} />
      <Table bordered striped size='sm'>
        <thead>
          <tr>
            <th>NAME</th>
            <th>SEX</th>
            <th>BIRTHDAY</th>
            <th>CONTACTS</th>
            <th>POSITION</th>
            <th>SALARY</th>
            <th>ACTIONS</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.sex}</td>
              <td>{employee.birthday}</td>
              <td>{employee.contacts}</td>
              <td>{employee.position}</td>
              <td>{employee.salary}</td>
              <td>
                <Button color='secondary' size='sm' className='mr-2' outline onClick={() => { editEmployeeHandler(employee._id) }}>EDIT</Button>{' '}
                <Button color='danger' size='sm' outline onClick={() => { deleteEmployeeHandler(employee._id) }}>DELETE</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default EmployeePage;