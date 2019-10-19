import axios from 'axios';

const instance = axios.create({
    //baseURL: 'glass-office.herokuapp.com/'
    baseURL: 'https://glass-office.herokuapp.com/'
});

export default instance;