import { Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getToken,
  setRefreshToken,
  setToken,
} from "../../../services/localStorageService";
import authApi from "../../../api/authApi";
import userApi from "../../../api/userApi";
import { setUserDetails } from "../../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { message, Spin, Typography } from "antd";

const Authenticate: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isValid, setIsValid] = useState<boolean>(true);
  const { Text } = Typography;

  useEffect(() => {
        
    // Function to handle authentication process
    const authenticate = async () => {
      const authCodeRegex = /code=([^&]+)/;
      const stateRegex = /state=([^&]+)/;

      // Extract authorization code and state from the current URL
      const isCodeMatch = window.location.href.match(authCodeRegex);
      const isStateMatch = window.location.href.match(stateRegex);

      
      if (isCodeMatch && isStateMatch) {
        const authCode = isCodeMatch[1];
        let provider = isStateMatch[1];

        // Clean up provider string if it ends with "#_=_" (for FB only)
        if (provider.endsWith("#_=_")) {
          provider = provider.replace("#_=_", "");
        }

        // Authenticate with the identity provider
        const { ok, body, error } =
          await authApi.authenticateByIdentityProvider(authCode, provider);
        if (ok && body) {
          // Store tokens in local storage
          setToken(body.token);
          setRefreshToken(body.refreshToken);

          // Fetch user details after successful authentication
          fetchUserDetails();
        } else if (error) {
          // Redirect to login page if there's an authentication error
          navigate("/login");
          console.error("Authentication error:", error);
        }
      } else {
        setIsValid(false);
      }
    };

    authenticate();
  }, []);

  // Redirect based on token presence if authentication is not valid
  if (!isValid) {
    if (getToken()) {
      // If a token is present, redirect the user to the home page ("/")
      return <Navigate to="/" />;
    } else {
      // If no token is present, redirect the user to the login page ("/login")
      return <Navigate to="/login" />;
    }
  }

  // Fetch user details from the API
  const fetchUserDetails = async () => {
    try {
      const { ok, body, error } = await userApi.getUserDetail();
      if (ok && body) {
        // Dispatch user details to the Redux store
        dispatch(setUserDetails(body));
        //Navigate to the home page after successful user details retrieval
        navigate("/");
      } else if (error) {
        // Display error message if there's an issue fetching user details
        message.error("Fetching user details error");
      }
    } catch (err) {
      // Display error message in case of an exception
      message.error("Error fetching user details");
    }
  };

  return (
    <div className="processing-container">
      <Spin size="large" />
      <Text className="processing-message">Authenticating... Please wait.</Text>
    </div>
  );
};

export default Authenticate;
