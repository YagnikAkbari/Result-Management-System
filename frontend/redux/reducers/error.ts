import { SET_ERROR } from "../actions/error";

export interface errorState {
  errorMessage: string;
  errors: any;
}
const initialState = {
  errorMessage: "",
  errors: [],
};

const errorReducer = (state: errorState = initialState, action: any) => {
  switch (action?.type) {
    case SET_ERROR:
      return {
        ...state,
        ...action?.payload,
      };
    default:
      return state;
  }
};

export default errorReducer;
