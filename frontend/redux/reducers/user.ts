import { USER_LOGOUT } from "../actions/user";

export const SET_USER_DATA = "SET_USER_DATA";
export interface userInterface {
  Email: String;
  MobileNo: String;
  Name: String;
  userType: String;
  username: String;
}
export interface userState {
  userData: userInterface;
}
const initialState = {
  userData: {
    Email: "",
    MobileNo: "",
    Name: "",
    userType: "",
    username: "",
  },
};
const userReducer = (state: userState = initialState, action: any) => {
  switch (action?.type) {
    case SET_USER_DATA:
      return {
        ...state,
        userData: action?.payload,
      };
    case USER_LOGOUT:
      return {
        userData: null,
      };
    default:
      return state;
  }
};

export default userReducer;
