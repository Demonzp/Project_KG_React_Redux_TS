import { ActionTypes, IActionAuthChange, IActionSetToken, IActionSetLoading} from '../../types/authStore';
import AxiosService from '../../services/axiosService';
import { AppDispatch, AppThunk } from '../store';
import { IinitialStateSignin } from '../../types/signin';
import { IinitialStateSignup } from '../../types/signup';
import { AxiosError } from 'axios';
const axiosService = AxiosService.getInstance();

const _lockAuth: AppThunk<boolean> = (dispatch, getState) => {
  if (getState().auth.isLoading) {
    return false;
  }

  dispatch<IActionSetLoading>({
    type: ActionTypes.SET_LOADING,
    payload: true
  });

  return true;
};

const _getLocalToken = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    let localToken = localStorage.getItem('token');
    if (!localToken) {
      reject('token does not exist');
    } else {
      resolve(localToken);
    }
  });
};

const _checkToken: AppThunk<Promise<string>> = async (dispatch, getState): Promise<string> => {
  let token = getState().auth.token;

  if (token) {
    return token;
  }

  try {
    token = await _getLocalToken();
    dispatch(setToken(token));
    return token;
  } catch (error) {
    throw error;
  }
};

export const signinAction = (vals: IinitialStateSignin): AppThunk<Promise<boolean | Error>> => async (dispatch): Promise<boolean | Error> => {
  try {

    if (!dispatch(_lockAuth)) {
      throw new Error('You are already try signin!!!');
    }

    const token = await axiosService.guestAxios.post<{signedToken:string}>('/signin', vals).then(res => res.data.signedToken);

    dispatch<IActionSetLoading>({
      type: ActionTypes.SET_LOADING,
      payload: false
    });

    dispatch(setToken(`Bearer ${token}`));
    dispatch(checkAuth);
    return true;
  } catch (error) {
    const err = error as AxiosError;
    let msg = err.message;
    if (err.response) {
      msg = err.response.data.message;
    }
    dispatch<IActionSetLoading>({
      type: ActionTypes.SET_LOADING,
      payload: false
    });
    throw new Error(msg);
  }
};

export const signupAction = (vals: IinitialStateSignup): AppThunk<Promise<boolean | Error>> => async (dispatch): Promise<boolean | Error> => {
  try {
    if (!dispatch(_lockAuth)) {
      throw new Error('You are already try signup!!!');
    }

    await axiosService.guestAxios.post('/signup', vals);
    dispatch<IActionSetLoading>({
      type: ActionTypes.SET_LOADING,
      payload: false
    });
    return true;
  } catch (error) {
    const err = error as AxiosError;
    let msg = err.message;
    if (err.response) {
      msg = err.response.data;
    }
    dispatch<IActionSetLoading>({
      type: ActionTypes.SET_LOADING,
      payload: false
    });
    throw new Error(msg);
  }
};

export const checkAuth: AppThunk = async (dispatch) => {

  if (!dispatch(_lockAuth)) {
    return;
  }

  try {
    const token = await dispatch(_checkToken);
    if (!axiosService.userAxios) {
      throw new Error('Authorization process failed!');
    }
    const res = await axiosService.userAxios.get('/user');

    dispatch<IActionAuthChange>({
      type: ActionTypes.AUTH_CHANGE,
      payload: {
        user: res.data,
        token
      }
    });

  } catch (err) {
    console.error(err);
    dispatch<IActionAuthChange>({ type: ActionTypes.AUTH_CHANGE, payload: { user: null, token: null } });
    console.log('Authorization process failed!');
    throw err;
  }
};

export const actionSignout: AppThunk<void> = (dispatch) => {
  dispatch(setToken(null));
  dispatch(setGuest);
}

export const setToken = (token: string | null) => (dispatch: AppDispatch) => {
  axiosService.user = token;

  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }

  dispatch<IActionSetToken>({ type: ActionTypes.SET_TOKEN, payload: token });
};

export const setGuest = (dispatch: AppDispatch) => {
  axiosService.user = null;
  dispatch<IActionAuthChange>({ type: ActionTypes.AUTH_CHANGE, payload: { user: null, token: null } });
};