import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserState, UserType} from '../../types/user';

const initialState: UserState = {
  initializing: true,
  user: null,
  userEmail: '',
  userPassword: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setInitializing: (state, action: PayloadAction<boolean>) => {
      state.initializing = action.payload;
    },
    setUser: (state, action: PayloadAction<UserType | null>) => {
      state.user = action.payload;
      // if (action.payload) {
      //   state.user = {
      //     displayName: action.payload.displayName,
      //     email: action.payload.email,
      //     emailVerified: action.payload.emailVerified,
      //     uid: action.payload.uid,
      //     photoURL: action.payload.photoURL,
      //   };
      // } else {
      //   state.user = null;
      // }
    },
    setUserEmail: (state, action: PayloadAction<string>) => {
      state.userEmail = action.payload;
    },
    setUserPassword: (state, action: PayloadAction<string>) => {
      state.userPassword = action.payload;
    },
    resetUser: state => {
      state.user = null;
      state.userEmail = '';
      state.userPassword = '';
    },
  },
});

export const {
  setInitializing,
  setUser,
  setUserEmail,
  setUserPassword,
  resetUser,
} = userSlice.actions;

export default userSlice.reducer;
