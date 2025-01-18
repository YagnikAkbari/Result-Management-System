class tokenStorage {
  get = async () => {
    const token = await localStorage.getItem("token");
    if (token) {
      return token;
    }
  };
  set = (value: string) => {
    return localStorage.setItem("token", value);
  };
  remove = () => {
    console.log("removing token...");

    return localStorage.removeItem("token");
  };
  setUserType = (value: string) => {
    return localStorage.setItem("type", value);
  };
  getUserType = () => {
    return localStorage.getItem("type");
  };
  removeUserType = () => {
    console.log("usertype ...");
    return localStorage.removeItem("type");
  };
}
const tokens = new tokenStorage();
export { tokens };
