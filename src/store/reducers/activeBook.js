import { SET_ACTIVE_BOOK, REMOVE_ACTIVE_BOOK } from '../actionTypes';

const activeBookInitialState = null

export default (state = activeBookInitialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_BOOK:
      return action.activeBook;
    case REMOVE_ACTIVE_BOOK:
      return null;
    default:
      return state;
  }
}