import axios from 'axios';

const api = axios.create({
    baseURL: 'https://opentdb.com/api.php?amount=24&category=9&type=multiple'
})

export default api;