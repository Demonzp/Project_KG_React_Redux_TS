import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch, AppThunkDispatch } from '../state/store';

export const useThunkDispatch = ()=> useDispatch<AppThunkDispatch>();
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;