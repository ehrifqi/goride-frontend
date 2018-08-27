import { ADD_ERROR, REMOVE_ERROR } from '../actionTypes'

export function addError(message){
  return {
    type: ADD_ERROR,
    message: message
  }
}

export function removeError(){
  return {
    type: REMOVE_ERROR
  }
}