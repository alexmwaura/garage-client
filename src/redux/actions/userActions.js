import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  NEW_VEHICLE,
  LOADING_DATA,
  // MARK_NOTIFICATIONS_READ
} from "../types";
import Attendant from "../../pages/attendant";
import axios from "axios";
import React from "react";
import { getAllCustomers } from "./dataActions";
// let name;
const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdToken);
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};
export const loginUser = (userData, history) => (dispatch) => {
  // console.log(userData)
  dispatch({ type: LOADING_UI });
  axios
    .post("/login", userData)
    .then(async (res) => {
      setAuthorizationHeader(res.data.token);
      dispatch({ type: CLEAR_ERRORS });
      // console.log(res.data)
      const account = res.data.role;
      if (account === "attendant") {
        const { username } = res.data;
        localStorage.setItem("username", username);
        localStorage.setItem("role",account)
        history.push(`/${username}/customers`)
        window.location.reload();

        const getUser = localStorage.username;
        await dispatch(getAttendantData(getUser))
      }
      if(account === "mechanic"){
        const { username } = res.data;
        console.log(res.data)
        localStorage.setItem("username", username);
        localStorage.setItem("role",account)
        history.push("/attendant")
        window.location.reload();

        await dispatch(getAllCustomers());
      }
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const signupUser = (newUserData, history) => (dispatch) => {
  let account;

  dispatch({ type: LOADING_UI });
  axios
    .post("/signup", newUserData)
    .then(async(res) => {
      // console.log(res.data);
      setAuthorizationHeader(res.data.token);
      dispatch({ type: CLEAR_ERRORS });
      account = res.data.role;
      if (account === "attendant") {
        const { username,role } = newUserData;
        localStorage.setItem("username", username);
        localStorage.setItem("role", role);
        history.push(`/${username}/customers`); 

        window.location.reload();
        const getUser = localStorage.username;
        await dispatch(getAttendantData(getUser));
      }
      if(account === "mechanic"){
        const { username,role } = newUserData;
        console.log(res.data)
        localStorage.setItem("username", username);
        localStorage.setItem("role",role)
        history.push("/attendant")
        window.location.reload();

        await dispatch(getAllCustomers());
      }
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const uploadImage = (formData, username) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post(`/user/image/${username}`, formData)
    .then(() => {
      dispatch(getAttendantData(username));
    })
    .catch((err) => console.log(err));
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("FBIdToken");
  localStorage.removeItem("username");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
  window.location.reload();
};

export const getAttendantData = (username) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .get(`/user/${username}`)
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
      // console.log(res.data);
    })
    .catch((err) => console.log(err));
};


// export const getMechanics = ()