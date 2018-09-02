import { SET_CURRENT_USER, RESET_TOKEN } from "../actionTypes";
import { apiCall, setTokenHeader } from "../../services/api";
import { store } from "../index";

/**
 * ACTION CREATORS
 */
export function setCurrentUser(user, token, isAuthenticated = false) {
  return {
    type: SET_CURRENT_USER,
    isAuthenticated,
    token,
    user
  };
}

export function reSetToken(token, isAuthenticated = false) {
  return {
    type: RESET_TOKEN,
    token,
    isAuthenticated
  };
}

export function signInMember(data) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      // const member = store.getState()["currentUser"];
      return apiCall("post", `/auth/members_auth/login`, data)
        .then(user => {
          localStorage.setItem("token", user.token.access_token);
          dispatch(setCurrentUser(user.member, user.token.access_token, true));
          resolve(user);
        })
        .catch(err => {
          reject(err);
        });
    });
  };
}

export function signInDriver(data) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      // const member = store.getState()["currentUser"];
      return apiCall("post", `/auth/drivers_auth/login`, data)
        .then(user => {
          localStorage.setItem("token", user.token.access_token);
          dispatch(setCurrentUser(user, true));
          resolve(user);
        })
        .catch(err => {
          reject(err);
        });
    });
  };
}

export function registerMember(data) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      // const member = store.getState()["currentUser"];
      return apiCall("post", `/auth/members_auth/register`, data)
        .then(user => {
          localStorage.setItem("token", user.token.access_token);
          dispatch(setCurrentUser(user, true));
          resolve(user);
        })
        .catch(err => {
          reject(err);
        });
    });
  };
}

export function registerDriver(data) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      // const member = store.getState()["currentUser"];
      return apiCall("post", `/auth/drivers_auth/register`, data)
        .then(user => {
          localStorage.setItem("token", user.token.access_token);
          dispatch(setCurrentUser(user, true));
          resolve(user);
        })
        .catch(err => {
          reject(err);
        });
    });
  };
}
