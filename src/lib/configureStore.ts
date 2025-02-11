import { userSlice } from '@/slices/userSlice';
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDiscpatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDiscpatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
