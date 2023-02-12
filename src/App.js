import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "./app/store";
import useDarkTheme from "./hooks/useDarkTheme";
import Main from "./views/pages/Main";

const App = () => {
  const [colorTheme] = useDarkTheme();
  return (
    <Provider store={store}>
      <div className="background">
        <Main />
      </div>
      <Toaster position="bottom-left" reverseOrder={false} />
    </Provider>
  );
};

export default App;
