import { ADD_ERROR, REMOVE_ERROR } from '../actionTypes';

const initialState = {
  message: undefined
}

export default (state = initialState, action) => {
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
      return initialState;
  }
}