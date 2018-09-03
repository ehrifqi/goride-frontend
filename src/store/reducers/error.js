import { ADD_ERROR, REMOVE_ERROR } from '../actionTypes';

const errorInitialState = {
  message: undefined
}

export default (state = errorInitialState, action) => {
  switch (action.type) {
    case ADD_ERROR:
      return {
        message: action.message
      }
    case REMOVE_ERROR:
      return {
        message: undefined
      }
    default:
      return state;
  }
}