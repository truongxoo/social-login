/* eslint-disable */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthResponse, UserInformation } from '../../models';

interface UserState {
  isLoggedin: boolean;
  details: UserInformation | null;
}

const initialState: UserState = {
  isLoggedin: false,
  details: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails(state, action: PayloadAction<UserInformation | null>) {
      state.details = action.payload;
    },
    setLoginStatus(state, action: PayloadAction<boolean>) {
      state.isLoggedin = action.payload;
    },
    logout: (state) => {
      state.isLoggedin = false;
      state.details = null;
    },
  },
});

export const { setUserDetails, setLoginStatus } = userSlice.actions;

export default userSlice.reducer;