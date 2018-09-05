import { apiCall } from '../../api'
import { ORDERSTATUS } from '../../../common/data/orderStatus'

export function getActiveBookByMember(memberId, token, callback = undefined) {
  return apiCall('get', `/active_books/get_by_member?member_id=${memberId}`, undefined, {
    'Authorization': `Bearer ${token}`
  }, callback);
}

export function getActiveBookByDriver(driverId, token, callback = undefined) {
  return apiCall('get', `/active_books/get_by_driver?driver_id=${driverId}`, undefined, {
    'Authorization': `Bearer ${token}`
  }, callback)
}

export function createActiveBook(memberId, srcLat, srcLng, dstLat, dstLng, from, to, distance, price, priceWithGopay, token, callback = undefined) {
  return apiCall('post', `/active_books/create_active_book`, {
    member_id: memberId,
    driver_id: null,
    order_status_id: ORDERSTATUS.PENDING,
    src_lat: srcLat,
    src_long: srcLng,
    dest_lat: dstLat,
    dest_long: dstLng,
    distance: distance,
    price: price,
    price_with_gopay: priceWithGopay,
    from: from,
    to: to
  }, {
      'Authorization': `Bearer ${token}`
    }, callback);
}

export function setDriver(id, driverId, token, callback = undefined) {
  return apiCall('patch', `/active_books/set_driver`, {
    id: id,
    driver_id: driverId
  }, {
      'Authorization': `Bearer ${token}`
    }, callback);
}

export function moveActiveBookToHistory(id, orderStatusId, token, callback = undefined) {
  return apiCall('patch', '/active_books/move_to_history', {
    id: id,
    order_status_id: orderStatusId
  }, {
      'Authorization': `Bearer ${token}`
    }, callback)
}