import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../config';

const api = axios.create({
  baseURL: `${BASE_URL}`
});

api.interceptors.request.use(async config => {
  try {
    const userInfo = await AsyncStorage.getItem('userInfo');
    if (userInfo) {
      const { accessToken } = JSON.parse(userInfo);
      console.log(userInfo);
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  } catch (error) {
    console.error("Api.js error",error);
    return Promise.reject(error);
  }
});

export default api;