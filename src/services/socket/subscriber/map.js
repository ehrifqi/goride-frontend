import openSocket from 'socket.io-client'

import { SOCKETCONFIG } from '../config'

const socket = openSocket(SOCKETCONFIG.BASE_URL);

function subscribeToMoveDriver(driverId, callback) {
  socket.on('move:driver', (data) => {
    const { id, lat, lng } = data;
    if (driverId === id)
      callback({lat, lng});
  })
}

function removeSubscribeToMoveDriver() {
  socket.removeListener('move:driver')
}

function subscribeToMoveMember(memberId, callback) {
  socket.on('move:member', (data) => {
    const { id, lat, lng } = data;
    if (memberId === id)
      callback({lat, lng});
  })
}

function removeSubscribeToMoveMember() {
  socket.removeListener('move:member')
}

export {
  subscribeToMoveDriver,
  subscribeToMoveMember,
  removeSubscribeToMoveDriver,
  removeSubscribeToMoveMember
}