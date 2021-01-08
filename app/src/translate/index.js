import { Platform, NativeModules } from 'react-native';
import I18n from 'i18n-js';
import en from './locales/en-US';
import pt from './locales/pt-BR';

function init() {
  I18n.translations = {
    'en_US': en,
    'pt_BR': pt,
  };
  setLanguageToI18n();
}

function setLanguageToI18n() {
  const language = getLanguageByBackstage() || getLanguageByDevice();
  if (I18n.translations.hasOwnProperty(language)) {
    I18n.locale = language;
  } else {
    I18n.defaultLocale = 'pt_BR';
  }
}

function getLanguageByBackstage() {
  // return 'en_US';
  // return 'pt_BR';
  return null;
}

function getLanguageByDevice() {
  const normalizedLanguage = {
    'en_US': 'en_US',
    'pt_BR': 'pt_BR',
    'pt_US': 'pt_BR',
    'en': 'en_US',
    'pt': 'pt_BR'
  };
  const language = (Platform.OS === 'ios' ? NativeModules.SettingsManager.settings.AppleLocale : NativeModules.I18nManager.localeIdentifier) || 'pt_BR';
  return normalizedLanguage[language];
}

function translate(key) {
  return I18n.t(key);
}

init();

export {
  translate
}
