import { all, takeLatest } from "redux-saga/effects";
import { USER_LOGIN, USER_LOGOUT } from "../actions/user";
import { handleUserLogin, handleUserLogout } from "./handlers/user";

export function* watcherSaga(): Generator<any, void, unknown> {
  yield all([
    yield takeLatest(USER_LOGIN, handleUserLogin),
    yield takeLatest(USER_LOGOUT, handleUserLogout),
  ]);
}
