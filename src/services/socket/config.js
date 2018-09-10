export const SOCKETCONFIG = {
  BASE_URL: process.env.NODE_ENV === 'production' ? 'https://goride-node-socket.herokuapp.com/' : 'localhost:8000/'
}
// const socket = openSocket('https://goride-node-socket.herokuapp.com/');