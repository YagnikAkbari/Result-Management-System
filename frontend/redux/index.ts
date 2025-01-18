import { Action, combineReducers, Reducer } from "redux";
import userReducer, { userState } from "./reducers/user";
import errorReducer, { errorState } from "./reducers/error";
export interface RootState {
  user: userState;
  error: errorState;
}

const appReducers = combineReducers({
  user: userReducer,
  error: errorReducer,
});

const rootReducer: Reducer<RootState, Action> = (
  state: RootState | undefined,
  action: Action
): RootState => {
  return appReducers(state, action);
};
export default rootReducer;
