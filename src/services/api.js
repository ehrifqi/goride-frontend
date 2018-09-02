import axios from 'axios';

export function setTokenHeader(token) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
  else {
    delete axios.defaults.headers.common['Authorization'];
  }
}

export function extractTokenFromRes(data){
  return data.token.access_token;
}

export function apiCall(method, path, data, headers=undefined, callback=undefined) {
  const BASE_URL = 'https://bncc-goride-api.herokuapp.com/api/v1';
  return new Promise((resolve, reject) => {
    return axios.create({
      baseURL: 'https://bncc-goride-api.herokuapp.com/api/v1',
      headers: headers
    })[method](path, data).then(res => {
      if (res.status >= 200 && res.status < 300){
        if(callback)
          callback(res.data);
        resolve(res.data);
      }
      else {
        reject(res);
      }
    })
      .catch(err => {
        reject(err.response);
      })
  })
}