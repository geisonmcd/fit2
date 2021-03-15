import api from '../services/api';

async function authenticate(username, password) {
  const response = await api.fit.login(username, password);
  return (response.data || {}).token;
}

async function getSession(username) {
  const response = await api.fit.session(username);
  console.log({response});
  return response.data;
}

async function getUserRoles(idUser) {
  const response = await api.gennera.roles(idUser);
  return response.data;
}

export default {
  authenticate,
  getSession,
  getUserRoles
}
