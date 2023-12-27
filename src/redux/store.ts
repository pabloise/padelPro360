import {configureStore} from '@reduxjs/toolkit';
import userReducer from './modules/userSlice';
import clubReducer from './modules/clubSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    club: clubReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
