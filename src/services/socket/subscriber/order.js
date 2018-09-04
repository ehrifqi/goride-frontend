import openSocket from 'socket.io-client'

import { SOCKETCONFIG } from '../config'

const socket = openSocket(SOCKETCONFIG.BASE_URL);

function subscribeToNewBookingCustomer(driverId, callback){
  socket.on('newbooking:customer', activeBook => {
    if(activeBook)
      callback(activeBook);
  })
}

function removeSubscribeToNewBookingCustomer(){
  socket.removeListener('newbooking:accepted')
}

function subscribeToNewBookingAccepted(memberId, callback) {
  socket.on('newbooking:accepted', activeBook => {
    if (activeBook && activeBook.member_id && activeBook.member_id == memberId)
      callback(activeBook)
  });
}

function removeSubscribeToNewBookingAccepted(){
  socket.removeListener('newbooking:accepted')
}

function removeAllSubscriber(){
  socket.removeAllListeners();
}

export { subscribeToNewBookingAccepted }