import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { actionSignout, checkAuth, signinAction, signupAction } from '../state/actions/auth';
import { routeNames } from '../types/routeNames';
import { IinitialStateSignin } from '../types/signin';
import { IinitialStateSignup } from '../types/signup';
import { useAppSelector, useThunkDispatch } from './useStore';

let _isInit = false;

const useAuth = () => {
  const { token, user, authAttempted, isLoading } = useAppSelector(state => state.auth);
  const dispatch = useDispatch();
  const thunkDispatch = useThunkDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!_isInit) {
      _isInit = true;
      dispatch(checkAuth);
    }
  }, []);

  const signin = (vals: IinitialStateSignin) =>{
    thunkDispatch(signinAction(vals))
      .catch((err)=>{
        alert(err.message);
      });
  };

  const signup = (vals:IinitialStateSignup) =>{
    thunkDispatch(signupAction(vals))
      .then((_)=>{
        history.push(routeNames.SIGNIN);
      })
      .catch((err)=>{
        alert(err.message);
      });
  }

  const signout = ()=>{
    dispatch(actionSignout);
  };

  return{
    token,
    user,
    authAttempted,
    signin,
    signout,
    signup,
    isLoading
  }
};

export default useAuth;