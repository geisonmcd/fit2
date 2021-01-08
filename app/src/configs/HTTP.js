import { Platform } from 'react-native';
import axios from 'axios';
import {
  onRequestSuccess,
  onRequestError,
  onResponseSuccess,
  onResponseError
} from './HTTPInterceptor';

const web = axios.create({ timeout: 5000 });
// web.interceptors.request.use(onRequestSuccess, onRequestError);
// web.interceptors.response.use(onResponseSuccess, onResponseError);

const backstage = axios.create({ baseURL: 'https://apps.gennera.com.br', timeout: 5000 });
backstage.interceptors.request.use(onRequestSuccess, onRequestError);
backstage.interceptors.response.use(onResponseSuccess, onResponseError);

// const classroom = axios.create({ baseURL: 'https://classroom2.gennera.com.br', timeout: 5000 });
const classroom = axios.create({ baseURL: Platform.select({ ios: 'http://localhost:4800', android: 'http://10.0.2.2:4800' }), timeout: 5000 });
classroom.interceptors.request.use(onRequestSuccess, onRequestError);
classroom.interceptors.response.use(onResponseSuccess, onResponseError);

const locker = axios.create({ baseURL: 'https://files.gennera.com.br', timeout: 5000 });
locker.interceptors.request.use(onRequestSuccess, onRequestError);
locker.interceptors.response.use(onResponseSuccess, onResponseError);

export { web, backstage, classroom, locker };
