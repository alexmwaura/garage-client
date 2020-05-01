import {
  SET_ALL_CUSTOMERS,
  LOADING_DATA,
  NEW_VEHICLE,
  SET_CUSTOMER,
  NEW_CUSTOMER,
  LOADING_CUSTOMER,
  GET_MECHANICS,
  CREATE_NOTIFICATION

} from "../types";

const initialState = {
  customers: [],
  customer: {},
  vehicle: {},
  mechanics: [],
  notification: [],
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
    case GET_MECHANICS:
      return {
        ...state,
        mechanics: action.payload,
        loading: false
      }
    case CREATE_NOTIFICATION:
      return {
        ...state,
        notification: action.payload,
        loading: true,
      }    


    case NEW_VEHICLE:
      return {
        ...state,
        vehicle: action.payload,
        loading: false,
      };
    case NEW_CUSTOMER:
      return {
        ...state,
        customer: action.payload,
        loading: false,
      };
    case LOADING_CUSTOMER:
      return {
        ...state,
        loading: true,
      };
    case SET_CUSTOMER:
      return {
        ...state,
        customer: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
