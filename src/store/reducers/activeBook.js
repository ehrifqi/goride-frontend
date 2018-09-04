import { SET_ACTIVE_BOOK, REMOVE_ACTIVE_BOOK } from '../actionTypes';

const activeBookInitialState = null

export default (state = activeBookInitialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_BOOK:
      return {
        id: action.activeBook.id,
        member_id: action.activeBook.member_id,
        driver_id: action.activeBook.driver_id,
        from: action.activeBook.from,
        to: action.activeBook.to,
        price_with_gopay: action.activeBook.price_with_gopay,
        price: action.activeBook.price,
        src_lat: parseFloat(action.activeBook.src_lat),
        src_long: parseFloat(action.activeBook.src_long),
        dest_lat: parseFloat(action.activeBook.dest_lat),
        dest_long: parseFloat(action.activeBook.dest_long),
        order_status_id: action.activeBook.order_status_id,
        distance: parseFloat(action.activeBook.distance),
        created_at: action.activeBook.created_at,
        updated_at: action.activeBook.updated_at
      };
    case REMOVE_ACTIVE_BOOK:
      return null;
    default:
      return state;
  }
}