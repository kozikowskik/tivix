import axios from 'axios';
console.log(process.env)
export default axios.create({
      //baseURL: process.env.REACT_APP_BASE_URL
    baseURL: "http://localhost:8000/"
});
