import { Toaster } from "react-hot-toast";
import useAuthCheck from "./hooks/useAuthCheck";
import Main from "./views/pages/Main";

const App = () => {
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
