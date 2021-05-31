import { createStore, applyMiddleware, AnyAction } from 'redux';
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk';

import reducer from './reducers';

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
//const store = createStore(reducer, applyMiddleware(thunk as ThunkMiddleware<State, Actions>));

//export type ActionFunction = DispatchType;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunkDispatch = ThunkDispatch<RootState, void, AnyAction>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>

export default store;