import { SET_ALL_CUSTOMERS, LOADING_DATA, NEW_VEHICLE,SET_CUSTOMER } from "../types";

const initialState = {
  customers: [],
  customer:{},
  vehicle: {},
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

    case NEW_VEHICLE:
      return {
        ...state,
        vehicle: action.payload,
        loading: false,                                      
       
      }
    case SET_CUSTOMER:
      return {
        ...state,
        customer: action.payload,
        loading: false,
      }    
    default:
      return state;
  }
}
