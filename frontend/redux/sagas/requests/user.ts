import { post } from "@/redux/apiWrapper";
import { userState } from "@/redux/reducers/user";

export const userLoginApi = async (credentials: userState) => {
  return post("/login", credentials);
};
export const userLogoutApi = () => {
  return post("/logout");
};
