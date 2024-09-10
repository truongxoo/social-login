import React, { useEffect, useState } from "react";
import { Button, Input, Typography } from "antd";
import { imageCollection } from "../../../assets";
import { BsArrowRightCircle } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../../../hooks/common";
import userApi from "../../../api/userApi";
import { setUserDetails } from "../../../redux/slices/authSlice";
import { PasswordCreationRequest } from "../../../models";
import { getHint, setHint } from "../../../services/localStorageService";

const { Title, Text } = Typography;

const FlipCard: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHint, setIsHint] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const dispatch = useAppDispatch();
  const userDetails = useAppSelector((state) => state.user.details);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  /**
   * Handles changes to the password input field and clears the error if a value is entered.
   */
  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPassword(e.target.value);
    if (e.target.value) {
      setPasswordError("");
    }
  };

  /**
   * Hides the hint and sets its visibility to true.
   */
  const handleHideHint = () => {
    setHint("ignore");
    setIsHint(true);
  };

  useEffect(() => {
    // Check if hint should be displayed based on some condition
    if (getHint()) {
      setIsHint(true);
    }
  }, []);

  /**
   * Handles changes to the confirm password input field and clears the error if a value is entered.
   */
  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setConfirmPassword(e.target.value);
    if (e.target.value) {
      setConfirmPasswordError(""); // Clear the error message if there is input
    }
  };
  /**
   * Validates the passwords and initiates the process to create a new password.
   */
  const handleSubmit = () => {
    if (!password) {
      setPasswordError("Password is required."); // Error if password field is empty
      return;
    }

    if (password && password.length < 6) {
      setPasswordError("Password must be at least 6 char long"); // Error if password is too short
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match."); // Error if passwords do not match
      return;
    }

    handleNewPassword(); // Proceed with creating a new password
  };

  /**
   * Sends a request to create a new password and fetches user details upon success.
   */
  const handleNewPassword = async () => {
    const request: PasswordCreationRequest = {
      password: password,
    };
    const { ok } = await userApi.createNewPassword(request);
    if (ok) {
      // Fetch user details after successfully creating a new password
      getUserDetail();
    }
  };

  /**
   * Fetches user details from the API and updates the Redux store with the retrieved data.
   */
  const getUserDetail = async () => {
    const { ok, body } = await userApi.getUserDetail();
    if (ok && body) {
      dispatch(setUserDetails(body));
    }
  };

  return (
    <div
      className={`flip-card  ${
        isHint || !userDetails?.viaSocial ? "hide" : ""
      }`}
    >
      <div className={`flip-card-inner ${isFlipped ? "flipped" : ""}`}>
        <div className="flip-card-front">
          <Title level={5}>One more step to unlock a world</Title>
          <Text>Finishing setup your account, please create a password.</Text>
          <div className="img-front">
            <img src={imageCollection.logo} alt="" />
          </div>
          <div className="hint-wrapper">
            <div className="cancel-button" onClick={handleHideHint}>
              Not now
            </div>
            <div className="hint" onClick={handleFlip}>
              <BsArrowRightCircle />
            </div>
          </div>
        </div>

        <div className="flip-card-back" onClick={(e) => e.stopPropagation()}>
          <Title level={3} style={{ color: "white" }}>
            Set Your New Password
          </Title>
          <Input.Password
            maxLength={25}
            className="input-primary"
            placeholder="Enter new password"
            value={password}
            onChange={handlePasswordChange}
            status={passwordError ? "error" : ""}
          />
          <Input.Password
            maxLength={25}
            className="input-primary"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            status={confirmPasswordError ? "error" : ""}
          />
          <div className="error-message">
            {confirmPasswordError || passwordError}
          </div>
          <Button className="button-submit" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
