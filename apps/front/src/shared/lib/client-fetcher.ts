import { environment } from '@/env';
import axios from 'axios';

export const clientAxios = axios.create({
  baseURL: environment.apiUrl,
  withCredentials: true,
});
