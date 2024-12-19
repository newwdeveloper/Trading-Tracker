import { RouterProvider } from "react-router-dom";
import "./App.css";
import appStore, { persistor } from "./components/appStore";
import appRouter from "./components/Container";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <Provider store={appStore}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <RouterProvider router={appRouter} />
      </PersistGate>
    </Provider>
  );
}

export default App;
