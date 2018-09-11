import { apiCall } from '../../api'

export function show(id, token, callback = undefined) {
  return apiCall('get', `/drivers/show?id=${id}`, undefined, {
    'Authorization': `Bearer ${token}`
  }, callback);
}

export function update({
  id, email, password, fullName, birthdate, licensePlate, phoneNumber, licenseNumber, ktpNumber, address
}, token, callback = undefined) {
  return apiCall('patch', `/drivers/update`, {
    id: id,
    email: email,
    password: password,
    full_name: fullName,
    birthdate: birthdate,
    license_plate: licensePlate,
    phone_number: phoneNumber,
    license_number: licenseNumber,
    ktp_number: ktpNumber,
    address: address
  }, {
      'Authorization': `Bearer ${token}`
    }, callback)
}