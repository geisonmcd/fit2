import LocalStorage from './LocalStorage';
// import navigationService from '../services/navigationService';

export async function onRequestSuccess (config) {
  const token = await LocalStorage.get('token');
  if (token) {
    config.headers['x-access-token'] = token;
  }
  return config;
};

export function onResponseSuccess(response) {
  return response;
};

export function onRequestError (error) {
  console.log('[ERROR - onRequestError]', JSON.stringify(error, null, 2));
  return Promise.reject(error);
};

export async function onResponseError (error) {
  console.log(JSON.parse(JSON.stringify(error)));
  console.log('[ERROR - onResponseError]', `[${error.config.method}] ${error.message}\n${error.config.url}`);
  if (error.message === 'Request failed with status code 401') {
    await LocalStorage.remove('token');
    // navigationService.navigate('Login');
    return Promise.reject({ message: 'A autenticação falhou, tente novamente!'});
  }
  return Promise.reject(error);
};
