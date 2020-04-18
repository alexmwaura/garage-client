import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  // SET_UNAUTHENTICATED,
  LOADING_USER,
  // MARK_NOTIFICATIONS_READ
} from "../types";
import Attendant from "../../pages/attendant";
import axios from "axios";
import React from "react";
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
         history.push("/attendant");
         window.location.reload();

        const  getUser = localStorage.username
        await dispatch(getAttendantData(getUser));
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
    .then((res) => {
      // console.log(res.data);
      setAuthorizationHeader(res.data.token);
      dispatch({ type: CLEAR_ERRORS });
      account = res.data.role;
      if (account === "attendant") {
        const { username } = newUserData;
        localStorage.setItem("username", username);
        history.push("/attendant");
        dispatch(getAttendantData(username));
      }
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
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
      console.log(res.data);
    })
    .catch((err) => console.log(err));
};
