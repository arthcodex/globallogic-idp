import axios from 'axios';

const baseURL: string = 'http://localhost:3000';

const client = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

export default client;
