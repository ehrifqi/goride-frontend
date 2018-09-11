import { SET_CURRENT_USER, RESET_TOKEN, REMOVE_CURRENT_USER } from '../actionTypes';

const currentUserInitialState = {
  isAuthenticated: false,
  user: {},
  token: ''
}

export default (state = currentUserInitialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
        user: action.user,
        token: action.token
      }
    case RESET_TOKEN:
      localStorage.setItem('token', action.token);
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
        token: action.token
      }
    case REMOVE_CURRENT_USER:
      localStorage.removeItem('token');
      return {
        ...currentUserInitialState
      }
    default:
      return state;
  }
}