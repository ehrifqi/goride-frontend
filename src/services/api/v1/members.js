import { apiCall } from '../../api'

export function show(id, token, callback = undefined) {
  return apiCall('get', `/members/show?id=${id}`, undefined, {
    'Authorization': `Bearer ${token}`
  }, callback);
}
