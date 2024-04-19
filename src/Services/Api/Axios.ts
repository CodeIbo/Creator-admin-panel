import axios from 'axios';

const fullDomain = `${window.location.protocol}//${window.location.hostname}${
  window.location.port ? `:${window.location.port}` : ''
}`;
export default axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
  headers: {
    'Access-Control-Allow-Origin': fullDomain,
  },
});

export const axiosPrivate = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
