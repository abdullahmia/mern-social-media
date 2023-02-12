import { Toaster } from "react-hot-toast";
import useAuthCheck from "./hooks/useAuthCheck";
import useDarkTheme from "./hooks/useDarkTheme";
import Main from "./views/pages/Main";

const App = () => {
  const [colorTheme] = useDarkTheme();
  const authCheck = useAuthCheck();
  return authCheck ? (
    <>
      <div className="background">
        <Main />
      </div>
      <Toaster position="bottom-left" reverseOrder={false} />
    </>
  ) : (
    <>Loading</>
  );
};
export default App;
