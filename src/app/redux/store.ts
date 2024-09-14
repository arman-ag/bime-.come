import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './features/personalInfo/infoSlice';

export const store = configureStore({
  reducer: { userSlice },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
