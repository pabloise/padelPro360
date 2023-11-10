import {createSlice, Action, Reducer, PayloadAction} from '@reduxjs/toolkit';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';

type userState = {
  user: FirebaseAuthTypes.User | null;
  loading: boolean;
};

const initialState: userState = {
  user: null,
  loading: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<userState>) => {
      state.user = action.payload;
    },
    resetUser: state => {
      state.user = null;
    },
  },
});

export const {setUser, resetUser} = userSlice.actions;

export default userSlice.reducer;
