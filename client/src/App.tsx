import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Navbar from './containers/Navbar/Navbar';
import { useAppSelector } from './hooks/useStore';
import {changePage} from './state/actions/employee';

const App: React.FC = ()=> {
  // const {employees} = useAppSelector(state=>state.employee);
  // const dispatch = useDispatch();

  // useEffect(()=>{
  //   dispatch(changePage(1));
  // }, []);

  //console.log('user = ', user);
  return (
    <div className="App">
      <Navbar />
    </div>
  );
}

export default App;
