import {
  SET_ALL_CUSTOMERS,
  LOADING_DATA,
  CLEAR_ERRORS,
  NEW_CUSTOMER,
  NEW_VEHICLE,
  SET_ERRORS,
  SET_CUSTOMER,
  LOADING_UI,
} from "../types";
import axios from "axios";

import { getAttendantData } from "./userActions";

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
  customerId
  // attendant,
  // customerName
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
        type: SET_ERRORS,
        payload: [],
      });
    });
};

export const addCustomer = (customerData, userId) => (dispatch) => {
  axios
    .post(`/customer/${userId}`, customerData)
    .then((res) => {
      dispatch({
        type: NEW_CUSTOMER,
        payload: res.data,
      });
      console.log(res.data);
    })
    .then(() => {
      window.location.reload();
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
      console.log(err.response);
    });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
