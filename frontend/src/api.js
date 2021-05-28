import axios from 'axios';

let jwtAccessToken = localStorage.getItem('jwtAccessToken');

export default axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 5000,
    headers: {
        'Authorization': "JWT_TOKEN",
        "Authorization": `Bearer ${jwtAccessToken}`,
        "Content-Type": "application/json"
    }
});
