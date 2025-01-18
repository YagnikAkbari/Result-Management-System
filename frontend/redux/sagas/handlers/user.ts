import { loginState } from "@/redux/actions/user";
import { userLoginApi, userLogoutApi } from "../requests/user";
import { call, put } from "redux-saga/effects";
import { tokens } from "@/common/locals";
import { SET_USER_DATA } from "@/redux/reducers/user";
import { SET_ERROR } from "@/redux/actions/error";

export function* handleUserLogin(action: {
  type: string;
  payload: loginState;
}) {
  try {
    const response = yield call(userLoginApi, action.payload);
    console.log("response?.data?.data", response?.data?.data);

    const { token = null, user } = response?.data?.data || { user: {} };
    if (token) {
      tokens.set(token);
      tokens.setUserType(user?.userType);
      yield put({
        type: SET_USER_DATA,
        payload: user,
      });
    }
  } catch (err: any) {
    console.error("Login:-", err?.response);
    const errorData = err?.response?.data;
    if (err?.response?.status === 400) {
      yield put({
        type: SET_ERROR,
        payload: {
          errors: errorData?.errors,
          errorMessage: errorData?.message,
        },
      });
    }
  }
}

export function* handleUserLogout() {
  try {
    yield call(userLogoutApi);
    tokens.remove();
    tokens.removeUserType();
  } catch (err) {
    tokens.remove();
    tokens.removeUserType();
    console.error("Login:-", err);
  }
}
