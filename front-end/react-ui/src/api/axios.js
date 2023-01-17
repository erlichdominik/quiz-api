import axios from 'axios';

const BASE_URL = 'https://secret-thicket-39797.herokuapp.com/';

export default axios.create({
  baseURL: BASE_URL,
  // proxy: {
  //   host: '127.0.0.1:8080',
  // }
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});
