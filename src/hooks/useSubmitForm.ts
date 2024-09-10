/* eslint-disable */
import {setIsSubmitting} from '../components/Forms/formSlice';
import {useCallback} from 'react';
import {useAppDispatch} from './common';

const useSubmitForm = (callbackFn: any) => {
  const dispatch = useAppDispatch();

  return useCallback(
    async (...args: any) => {
      dispatch(setIsSubmitting(true));
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      await callbackFn(...args);
      dispatch(setIsSubmitting(false));
    },
    [dispatch, callbackFn]
  );
};

export default useSubmitForm;
