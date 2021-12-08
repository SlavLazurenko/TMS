import axios from 'axios';
require('dotenv').config();

const instance = axios.create({
  withCredentials: true,
  mode: 'cors',
  baseURL: process.env.REACT_APP_PROXY_URL,
  // proxy: {
  //   protocol: 'http',
  //   host: 'localhost',
  //   port: 3001
  // }
});

export default instance;
