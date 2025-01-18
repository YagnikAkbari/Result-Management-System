export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";

export interface loginState {
  username: string;
  password: string;
}

export const userLogin = (credentials: loginState) => {
  return {
    type: USER_LOGIN,
    payload: credentials,
  };
};

export const userLogout = () => {
  return {
    type: USER_LOGOUT,
  };
};
