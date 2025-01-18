import { Store } from "redux";
import { createWrapper } from "next-redux-wrapper";
import createSagaMiddleware, { Task } from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";
import { watcherSaga } from "./sagas/root";
import rootReducer, { RootState } from "./index";

const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(sagaMiddleware),
  });

  const sagaTask: Task = sagaMiddleware.run(watcherSaga);

  (store as any).sagaTask = sagaTask;

  return store;
};

export const wrapper = createWrapper<Store<RootState>>(makeStore, {
  debug: process.env.NEXT_PUBLIC_IS_DEBUG === "true" ? true : false,
  serializeState: (state) => JSON.stringify(state),
  deserializeState: (state) => JSON.parse(state),
});

export const store = makeStore();
