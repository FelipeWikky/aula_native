import axios from 'axios';

export default axios.create({
  baseURL:'http://192.168.0.103:3000'
  // baseURL:'http://localhost:3000'
});