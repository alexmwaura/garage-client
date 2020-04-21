import {
  SET_ALL_CUSTOMERS,
  LOADING_DATA,
  CLEAR_ERRORS,
  NEW_VEHICLE,
  SET_ERRORS,
  SET_CUSTOMER,
} from "../types";
import axios from "axios";

export const getAllCustomers = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/customers")
    .then((res) => {
      dispatch({
        type: SET_ALL_CUSTOMERS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_ALL_CUSTOMERS,
        payload: [],
      });
    });
};

export const addVehicle = (
  vehicleData,
  customerId,
  attendant,
  customerName
) => (dispatch) => {
  axios
    .post(`/customer/vehicle/${customerId}`, vehicleData)
    .then((res) => {
      if (res.data.registration === "Already exists") {
        dispatch({
          type: SET_ERRORS,
          payload: res.data,
        });
      }
      dispatch({
        type: NEW_VEHICLE,
        payload: res.data,
      });
      dispatch(getCustomer(customerId));
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const getCustomer = (customerId) => (dispatch) => {
  axios
    .get(`/customer/${customerId}`)
    .then((res) => {
      dispatch({
        type: SET_CUSTOMER,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_CUSTOMER,
        payload: [],
      });
    });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
