import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { nonPersistedSlice, userslice } from "./slices";

const rootReducer = combineReducers({
  user: userslice,
  UserTypes: nonPersistedSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
