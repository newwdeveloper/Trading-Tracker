import { RouterProvider } from "react-router-dom";
import "./App.css";
import appStore from "./components/appStore";
import appRouter from "./components/Container";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={appStore}>
      <RouterProvider router={appRouter} />;
    </Provider>
  );
}

export default App;
