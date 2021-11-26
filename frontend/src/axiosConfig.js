import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  mode: 'cors'
});

export default instance;
