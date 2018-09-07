import openSocket from 'socket.io-client'

import { SOCKETCONFIG } from '../config'

const socket = openSocket(SOCKETCONFIG.BASE_URL);

function subscribeToNewBookingCustomer(driverId, callback) {
  socket.on('newbooking:customer', activeBook => {
    if (activeBook)
      callback(activeBook);
  })
}

function removeSubscribeToNewBookingCustomer() {
  socket.removeListener('newbooking:accepted')
}

function subscribeToNewBookingAccepted(memberId, callback) {
  socket.on('newbooking:accepted', activeBook => {
    if (activeBook && activeBook.member_id && activeBook.member_id == memberId)
      callback(activeBook)
  });
}

function removeSubscribeToNewBookingAccepted() {
  socket.removeListener('newbooking:accepted')
}

function subscribeToNewBookingMemberCancellation(driverId, callback) {
  socket.on('newbooking:membercancellation', activeBook => {
    if (activeBook && activeBook.driver_id && activeBook.driver_id == driverId)
      callback(activeBook)
  });
}

function removeSubscribeToNewBookingMemberCancellation() {
  socket.removeListener('newbooking:membercancellation')
}

function subscribeToNewBookingDriverCancellation(memberId, callback) {
  socket.on('newbooking:drivercancellation', activeBook => {
    if (activeBook && activeBook.member_id && activeBook.member_id == memberId)
      callback(activeBook)
  });
}

function subscribeToNewBookingPickedup(memberId, callback) {
  socket.on('newbooking:pickedup', activeBook => {
    if (activeBook && activeBook.member_id && activeBook.member_id == memberId)
      callback(activeBook)
  });
}

function subscribeToNewBookingArrived(memberId, callback) {
  socket.on('newbooking:arrived', activeBook => {
    if (activeBook && activeBook.member_id && activeBook.member_id === memberId)
      callback(activeBook);
  })
}

function removeSubscribeToNewBookingDriverCancellation() {
  socket.removeListener('newbooking:drivercancellation')
}

function removeAllSubscriber() {
  socket.removeAllListeners();
}

export {
  subscribeToNewBookingAccepted,
  subscribeToNewBookingCustomer,
  removeSubscribeToNewBookingAccepted,
  removeSubscribeToNewBookingCustomer,
  subscribeToNewBookingMemberCancellation,
  subscribeToNewBookingDriverCancellation,
  removeSubscribeToNewBookingMemberCancellation,
  removeSubscribeToNewBookingDriverCancellation,
  subscribeToNewBookingPickedup,
  subscribeToNewBookingArrived,
  removeAllSubscriber
}