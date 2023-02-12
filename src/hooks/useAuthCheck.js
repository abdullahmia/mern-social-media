import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../features/auth/authSlice";

const useAuthCheck = () => {
  const [authCheck, setAuthCheck] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    let user = localStorage.getItem("user");
    let token = localStorage.getItem("token");
    user = JSON.parse(user);
    if (token && user) {
      dispatch(
        userLoggedIn({
          user: user,
          token: token,
        })
      );
    }

    setAuthCheck(true);
  }, [dispatch]);

  return authCheck;
};

export default useAuthCheck;
