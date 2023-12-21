import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {GenderType, Location, UserState, UserType} from '../../types/user';

const initialState: UserState = {
  initializing: true,
  isLoading: false,
  user: null,
  userEmail: '',
  userPassword: '',
  userName: '',
  userGender: null,
  userType: 'normal',
  clubName: '',
  clubAddress: '',
  clubGoogleMapsLink: '',
  location: null,
  status: 'pending',
  courts: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setInitializing: (state, action: PayloadAction<boolean>) => {
      state.initializing = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setUser: (state, action: PayloadAction<UserType | null>) => {
      state.user = action.payload;
    },
    setUserEmail: (state, action: PayloadAction<string>) => {
      state.userEmail = action.payload;
    },
    setUserPassword: (state, action: PayloadAction<string>) => {
      state.userPassword = action.payload;
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
    setGender: (state, action: PayloadAction<GenderType>) => {
      state.userGender = action.payload;
    },
    setUserType: (state, action: PayloadAction<'normal' | 'owner'>) => {
      state.userType = action.payload;
    },
    setClubName: (state, action: PayloadAction<string>) => {
      state.clubName = action.payload;
    },
    setClubAddress: (state, action: PayloadAction<string>) => {
      state.clubAddress = action.payload;
    },
    setClubGoogleMapsLink: (state, action: PayloadAction<string>) => {
      state.clubGoogleMapsLink = action.payload;
    },
    setLocation: (state, action: PayloadAction<Location>) => {
      state.location = action.payload;
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
  setIsLoading,
  setUser,
  setUserEmail,
  setUserPassword,
  setUserName,
  setGender,
  resetUser,
  setUserType,
  setClubAddress,
  setClubGoogleMapsLink,
  setClubName,
  setLocation,
} = userSlice.actions;

export default userSlice.reducer;
