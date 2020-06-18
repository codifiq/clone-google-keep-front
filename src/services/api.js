import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 5000,
  headers: { 'Accept': 'application/json' },
});

const api = {};

api.get = (path) => {
  return axiosInstance.get(path).then(response => response.data);
};

api.post = (path, data) => {
  return axiosInstance.post(path, data).then(response => response.data);
};

api.put = (path, data) => {
  return axiosInstance.put(path, data).then(response => response.data);
};

api.delete = (path) => {
  return axiosInstance.delete(path).then(response => response.data);
};

export default api;
