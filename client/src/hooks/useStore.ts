import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import store, { RootState, AppDispatch, AppThunkDispatch } from '../state/store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useThunkDispatch = ()=> useDispatch<AppThunkDispatch>();
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;