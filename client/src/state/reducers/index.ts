import { combineReducers } from 'redux';
import auth from './auth';
import employee from './employee';

const reducer = combineReducers({
    auth,
    employee
});

export default reducer;