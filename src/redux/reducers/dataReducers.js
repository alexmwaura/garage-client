import { SET_ALL_CUSTOMERS, LOADING_DATA } from "../types";
const initialState = {
  customers: [],
  loading: false,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_ALL_CUSTOMERS:
      return {
        ...state,
        customers: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
