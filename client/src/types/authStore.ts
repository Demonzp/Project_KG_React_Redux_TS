
export interface IUser {
  _id: string
}

export type Token = string | null;
export type User = IUser | null;

export interface IAuthState {
  authAttempted: boolean;
  isLoading: boolean;
  token: Token;
  user: User;
}

export enum ActionTypes { 
  AUTH_CHANGE = 'AUTH_CHANGE', 
  SET_TOKEN = 'SET_TOKEN', 
  SET_LOADING = 'SET_LOADING'
};

export interface IActionAuthChange {
  type: ActionTypes.AUTH_CHANGE;
  payload: {
    user: User;
    token: string | null;
  }
}

export interface IActionSetToken {
  type: ActionTypes.SET_TOKEN;
  payload: string | null;
}

export interface IActionSetLoading {
  type: ActionTypes.SET_LOADING;
  payload: boolean;
}

export type ActionsAuth = IActionAuthChange | IActionSetToken | IActionSetLoading;