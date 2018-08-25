import { SET_CURRENT_USER } from '../actionTypes';
import { apiCall, setTokenHeader } from '../../services/api';
import { store } from '../index';

/**
 * ACTION CREATORS
 */
export function setCurrentUser(user, isAuthenticated = false){
  return {
    type: SET_CURRENT_USER,
    isAuthenticated,
    user
  }
}

export function signInMember(data){
  return dispatch => {
    return new Promise((resolve, reject) => {
      // const member = store.getState()["currentUser"];
      return apiCall('post', `/auth/members_auth/login`, data)
        .then(user => {
          localStorage.setItem('token', user.token.access_token);
          dispatch(setCurrentUser(user, true));
          resolve(user);
        })
        .catch(err => {
          reject(err);
        });
    })
  }
}