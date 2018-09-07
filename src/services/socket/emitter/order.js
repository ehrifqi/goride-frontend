import openSocket from 'socket.io-client'

import { SOCKETCONFIG } from '../config'

const socket = openSocket(SOCKETCONFIG.BASE_URL);

function emitNewBookingCustomer(activeBook) {
  socket.emit('newbooking:customer', activeBook);
}

function emitNewBookingMemberCancellation(activeBook) {
  socket.emit('newbooking:membercancellation', activeBook);
}

function emitNewBookingDriverCancellation(activeBook) {
  socket.emit('newbooking:drivercancellation', activeBook);
}

function emitNewBookingAccepted(activeBook) {
  socket.emit('newbooking:accepted', activeBook);
}

function emitNewBookingPickedup(activeBook) {
  socket.emit('newbooking:pickedup', activeBook);
}

function emitNewBookingArrived(activeBook) {
  socket.emit('newbooking:arrived', activeBook);
}

export {
  emitNewBookingCustomer,
  emitNewBookingMemberCancellation,
  emitNewBookingDriverCancellation,
  emitNewBookingAccepted,
  emitNewBookingPickedup,
  emitNewBookingArrived
}