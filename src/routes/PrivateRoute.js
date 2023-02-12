import { Navigate } from "react-router-dom";
import useIsAuthenticated from "../hooks/useIsAuthenticated";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useIsAuthenticated();
  return isAuthenticated ? children : <Navigate to={"/login"} />;
};

export default PrivateRoute;
