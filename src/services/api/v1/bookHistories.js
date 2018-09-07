import { apiCall } from '../../api'

export function getMemberBookHistories(memberId, token, orderStatusId = undefined, callback = undefined) {
  let url = `/book_histories/member_histories?member_id=${memberId}`;
  if (orderStatusId)
    url += `&order_status_id=${orderStatusId}`

  return apiCall('get', url, undefined, {
    'Authorization': `Bearer ${token}`
  }, callback);
}

export function getDriverBookHistories(driverId, token, orderStatusId = undefined, callback = undefined) {
  let url = `/book_histories/driver_histories?driver_id=${driverId}`;
  if (orderStatusId)
    url += `&order_status_id=${orderStatusId}`

  return apiCall('get', url, undefined, {
    'Authorization': `Bearer ${token}`
  }, callback);
}

export function updateRating(id, rating, token, callback = undefined) {
  return apiCall('patch', '/book_histories/update_rating', {
    id: id,
    rating: rating
  }, {
    'Authorization': `Bearer ${token}`
  }, callback);
}