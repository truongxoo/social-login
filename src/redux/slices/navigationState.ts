/* eslint-disable */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NavigationState {
  prevUrl: string | null;
}
const initialState: NavigationState = {
  prevUrl: null,
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setPrevUrl(state, action: PayloadAction<string | null>) {
      state.prevUrl = action.payload;
    },
  },
});

export const { setPrevUrl } = navigationSlice.actions;
export default navigationSlice.reducer;
