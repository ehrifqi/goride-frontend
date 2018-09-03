import { SET_ACTIVE_BOOK, REMOVE_ACTIVE_BOOK } from '../actionTypes';

export function setActiveBook(activeBook) {
  return {
    type: SET_ACTIVE_BOOK,
    activeBook
  }
}

export function removeActiveBook(){
  return {
    type: REMOVE_ACTIVE_BOOK
  }
}
