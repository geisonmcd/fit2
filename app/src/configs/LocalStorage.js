import AsyncStorage from '@react-native-async-storage/async-storage';

const PREFIX = '@Gennera';

function convertObjectPropertiesToArray(object) {
  const array = [];
  for (const key in object) {
    array.push([`${PREFIX}:${key}`, object[key] ? JSON.stringify(object[key]) : '']);
  }
  return array;
}

function convertArrayToObjectProperties(array) {
  return array.reduce((accumulator, currentValue) => {
    const key = currentValue[0].split(':')[1];
    const value = currentValue[1];
    return Object.assign(accumulator, {[key]: value ? JSON.parse(value) : ''});
  }, {});
}

async function get(key) {
  try {
    return JSON.parse(await AsyncStorage.getItem(`${PREFIX}:${key}`));
  } catch (e) {
    console.log('[LocalStorage] Error on GET', e);
  }
}

async function getMany(keys) {
  try {
    const array = await AsyncStorage.multiGet(keys.map(key => `${PREFIX}:${key}`));
    return convertArrayToObjectProperties(array);
  } catch (e) {
    console.log('[LocalStorage] Error on GET MANY', e);
  }
}

async function set(key, value) {
  try {
    await AsyncStorage.setItem(`${PREFIX}:${key}`, value ? JSON.stringify(value) : '');
  } catch (e) {
    console.log('[LocalStorage] Error on SET', e);
  }
}

async function setMany(object) {
  try {
    await AsyncStorage.multiSet(convertObjectPropertiesToArray(object));
  } catch (e) {
    console.log('[LocalStorage] Error on SET MANY', e);
  }
}

async function remove(key) {
  try {
    await AsyncStorage.removeItem(`${PREFIX}:${key}`);
  } catch (e) {
    console.log('[LocalStorage] Error on REMOVE', e);
  }
}

async function removeMany(keys) {
  try {
    await AsyncStorage.multiRemove(keys.map(key => `${PREFIX}:${key}`));
  } catch (e) {
    console.log('[LocalStorage] Error on REMOVE MANY', e);
  }
}

async function clear() {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.log('[LocalStorage] Error on CLEAR', e);
  }
}

export default { get, getMany, set, setMany, remove, removeMany, clear }
