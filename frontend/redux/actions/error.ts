export const SET_ERROR = "SET_ERROR";

export const setError = (errorMessage: string, errors: unknown) => {
  return {
    type: SET_ERROR,
    payload: { errorMessage, errors },
  };
};
