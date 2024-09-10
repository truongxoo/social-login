/* eslint-disable */
import { useAppTranslation, useErrTranslation } from "../../hooks/common";
import useSubmitForm from "../../hooks/useSubmitForm";
import { useLocation, useNavigate } from "react-router-dom";
import { LoginInformation } from "../../models";
import React, { useEffect, useState } from "react";
import authApi from "../../api/authApi";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { setPrevUrl } from "../../redux/slices/navigationState";
import LoginForm from "./components/LoginForm";
import { setUserDetails } from "../../redux/slices/authSlice";
import userApi from "../../api/userApi";
import { setRefreshToken, setToken } from "../../services/localStorageService";

const initialLoginFormValues: LoginInformation = {
  email: "",
  password: "",
};

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPrevUrl(location.pathname));
  }, []);

  // Handles form submission by calling the login API and processing the response.
  const onSubmitLoginForm = useSubmitForm(async (values: LoginInformation) => {
    const { ok, body, error } = await authApi.login(values);
    if (ok && body) {
      // Store the received tokens in local storage
      setToken(body.token);
      setRefreshToken(body.refreshToken);
      // Fetch user details and navigate to the home page
      fetchUserDetails();
      navigate("/");
    } else if (error) {
      // Display an error message if login fails
      message.error("Password or username failed");
    }
  });

  // Fetches user details from the API and updates the Redux state with the retrieved data.
  const fetchUserDetails = async () => {
    const { ok, body, error } = await userApi.getUserDetail();
    if (ok && body) {
      // Dispatch the user details to the Redux store
      dispatch(setUserDetails(body));
      // Navigate to the home page after fetching user details
      navigate("/");
    } else if (error) {
      // Display an error message if there is an issue fetching user details
      message.error("Fetching user details error");
    }
  };

  return (
    <LoginForm
      onSubmit={onSubmitLoginForm}
      initialValues={initialLoginFormValues}
    />
  );
};

export default LoginPage;
