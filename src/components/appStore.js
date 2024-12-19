import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../components/formSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, formReducer);
const appStore = configureStore({
  reducer: {
    input: persistedReducer,
  },
});
export const persistor = persistStore(appStore);
export default appStore;
