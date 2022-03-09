import axios from 'axios';
const api = axios.create({
  baseURL: 'https://api.covid19api.com',
})
console.log('config working')

export default api;