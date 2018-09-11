import { apiCall } from '../../api'

export function show(id, token, callback = undefined) {
  return apiCall('get', `/members/show?id=${id}`, undefined, {
    'Authorization': `Bearer ${token}`
  }, callback);
}

export function update({
  id, fullName, email, phoneNumber
}, token, callback = undefined) {
  return apiCall('patch', `/members/update`, {
    id: id,
    full_name: fullName,
    email: email,
    phone_number: phoneNumber
  }, {
      'Authorization': `Bearer ${token}`
    }, callback)
}