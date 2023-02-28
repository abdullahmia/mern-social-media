import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedOut } from '../features/auth/authSlice';

const useIsAuthenticated = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  if (user && token) {
    const decoded = jwt_decode(token);
    if (decoded.exp < Date.now() / 1000) {
      dispatch(userLoggedOut());
    }else {
      return true;
    }
  } else {
    return false;
  }
};

export default useIsAuthenticated;
