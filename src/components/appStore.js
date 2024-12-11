import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../components/formSlice";

const appStore = configureStore({
  reducer: {
    input: formReducer,
  },
});

export default appStore;
