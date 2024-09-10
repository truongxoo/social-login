/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { notification } from 'antd';
import authApi from '../../api/authApi';
import { RegistrationInfomation } from '../../models';
import { useAppTranslation, useErrTranslation } from '../../hooks/common';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPrevUrl } from '../../redux/slices/navigationState';
import useSubmitForm from '../../hooks/useSubmitForm';
import Password from 'antd/es/input/Password';
import SignUpForm from './SignUpForm';

const initialSignUpFormValues: RegistrationInfomation = {
  email: '',
  password: '',
  phone: '',
  countryCode: '',
  fullname: '',
  userTypeEnum: '',
  dialCode: '',
};

const SignUpPage: React.FC = () => {
  const t = useAppTranslation();
  const et = useErrTranslation();
  const navigate = useNavigate();
  const [errorShown, setErrorShown] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPrevUrl(location.pathname));
  }, []);

  const onSubmitSignUpForm = useSubmitForm(async (values: RegistrationInfomation) => {
    const phoneNumber = values.dialCode + values.phone;
    const body = {
      email: values.email,
      password: values.password,
      phone: phoneNumber,
      countryCode: values.countryCode || 'VN',
      fullname: values.fullname,
      userTypeEnum: values.userTypeEnum || 'CONSUMER',
      dialCode: values.dialCode,
    };

    // const response = await authApi.register(body);
  });

  return (
    <>
      <SignUpForm onSubmit={onSubmitSignUpForm} initialValues={initialSignUpFormValues} />
    </>
  );
};

export default SignUpPage;
