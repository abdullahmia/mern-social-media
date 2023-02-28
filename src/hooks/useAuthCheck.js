import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../features/auth/authSlice";
import { setDarkTheme, setLightTheme } from "../features/theme/themeSlice";

const useAuthCheck = () => {
  const [authCheck, setAuthCheck] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    let user = localStorage.getItem("user");
    let token = localStorage.getItem("token");
    let theme = localStorage.getItem("theme") || 'light';
    user = JSON.parse(user);
    if (token && user) {
      dispatch(
        userLoggedIn({
          user: user,
          token: token,
        })
      );
    }

    // set theme
    if (theme === "light") {
      dispatch(setLightTheme());
    } else {
      dispatch(setDarkTheme());
    }

    setAuthCheck(true);
  }, [dispatch]);

  return authCheck;
};

export default useAuthCheck;
