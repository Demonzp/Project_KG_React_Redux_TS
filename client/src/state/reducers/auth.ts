import { IAuthState, ActionsAuth, ActionTypes } from '../../types/authStore';

const initialState = {
  authAttempted: false,
  isLoading: false,
  token: null,
  user: null
}

const auth = (state: IAuthState = initialState, action: ActionsAuth): IAuthState => {

  switch (action.type) {
    case ActionTypes.AUTH_CHANGE: {
      const { user, token } = action.payload;

      return {
        user,
        authAttempted: true,
        isLoading: false,
        token
      }
    }

    case ActionTypes.SET_TOKEN: {
      return {
        ...state,
        token: action.payload
      }
    }

    case ActionTypes.SET_LOADING: {
      return{
        ...state,
        isLoading: action.payload
      }
    }

    default:
      return state;
  }
};

export default auth;