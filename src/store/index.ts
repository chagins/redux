import { configureStore } from '@reduxjs/toolkit';
import { counterModel } from 'features/Counter';

export const store = configureStore({
  reducer: {
    counter: counterModel.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
