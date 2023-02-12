import { useSelector } from "react-redux";

const useIsAuthenticated = () => {
  const { user, token } = useSelector((state) => state.auth);
  if (user && token) {
    return true;
  } else {
    return false;
  }
};

export default useIsAuthenticated;
