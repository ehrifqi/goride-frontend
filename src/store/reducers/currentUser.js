import { SET_CURRENT_USER, RESET_TOKEN } from '../actionTypes';

const initialState = {
  isAuthenticated: false,
  user: {},
  token: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
        user: action.user,
        token: action.token
      }
    case RESET_TOKEN:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
        token: action.token
      }
    default:
      return initialState;
  }
}