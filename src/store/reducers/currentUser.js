import { SET_CURRENT_USER } from '../actionTypes';

const initialState = {
  isAuthenticated: false,
  user: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: action.isAuthenticated,
        user: action.user
      }
    default:
      return initialState;
  }
}