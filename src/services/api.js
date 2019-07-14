import axios from 'axios';

import { getToken } from './auth';
import { BASE_URL } from './env';

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(async (config) => {
  try {
    const token = await getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  } catch (err) {
    alert(err);
  }
});

export default api;

export const whoAmI = async () => {
    var response = await api.get('/me',);
    return response.data.user;
}