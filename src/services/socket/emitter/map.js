import openSocket from 'socket.io-client'

import {SOCKETCONFIG} from '../config'

const socket = openSocket(SOCKETCONFIG.BASE_URL);

function emitMoveDriver({id, lat, lng}){
  socket.emit('move:driver', {id, lat, lng});
}

function emitMoveMember({id, lat, lng}){
  socket.emit('move:member', {id, lat, lng});
}

export { emitMoveDriver, 
  emitMoveMember 
}