import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import api from './api';



const HttpInterceptor = (token) => {
  api.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
};

export default HttpInterceptor;