import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../../../services/localStorageService";
import { useEffect, useState } from "react";

// UnProtectedRoute component
const UnProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Function to check if the user is authenticated (i.e., if access token exists)
    const checkAuthentication = () => {
      setIsAuthenticated(!!getToken());
    };
    checkAuthentication();
  }, []);

  // If the user is authenticated, redirect to home ("/"), otherwise render the child routes
  return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};

export default UnProtectedRoute;