/* eslint-disable */
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import formReducer from '../components/Forms/formSlice';
import userReducer from '../redux/slices/authSlice';


const store = configureStore({
  reducer: {
    form: formReducer,
    user: userReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export { store };
