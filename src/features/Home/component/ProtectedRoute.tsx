import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../../../services/localStorageService";

// Function to check if the user is authenticated by verifying the presence of a token
const isAuthenticated = () => {
  const token = getToken(); 
  return !!token; // Returns true if a token exists, indicating the user is authenticated
};

const ProtectedRoute = () => {
  // Conditionally render the appropriate component based on authentication status
  return isAuthenticated() ? (
    <Outlet /> // If authenticated, render the nested routes
  ) : (
    <Navigate to="/login" /> // If not authenticated, redirect to the login page
  );
};

export default ProtectedRoute;
