import { apiCall } from '../../api'

export function show(id, token, callback = undefined) {
  return apiCall('get', `/drivers/show?id=${id}`, undefined, {
    'Authorization': `Bearer ${token}`
  }, callback);
}
