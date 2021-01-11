import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer, DefaultTheme as DefaultLightTheme, DarkTheme as DefaultDarkTheme } from '@react-navigation/native';

import { AppContextProvider } from './contexts/AppContext';
import { AuthContextProvider } from './contexts/AuthContext';
import { dark, light } from './UI/system';
import Routes from './routes';
import { useColorScheme, StatusBar } from 'react-native';


export default function App() {
 
  const LightTheme = {
    ...DefaultLightTheme,
    statusBar: 'dark-content',
    colors: {
      ...DefaultLightTheme.colors,
      primary: light.colors.blue,
      text: light.label.primary,
      background: light.background.primary,
      card: light.background.secondary,
      border: light.separator.opaque,
      textMuted: light.colors.grey1
    },
    system: light
  };
  const DarkTheme = {
    ...DefaultDarkTheme,
    statusBar: 'light-content',
    colors: {
      ...DefaultDarkTheme.colors,
      primary: dark.colors.blue,
      text: dark.label.primary,
      background: dark.background.primary,
      card: dark.background.secondary,
      border: dark.separator.opaque,
      textMuted: dark.colors.grey1
    },
    system: dark
  };
  
  function isDarkTheme() {
    // return true;
    return useColorScheme() === 'dark';
  }

  const ActiveTheme = isDarkTheme() ? DarkTheme : LightTheme;


  return (
    <NavigationContainer theme={ActiveTheme}>
      <AuthContextProvider>
        <AppContextProvider>
          <Routes />
        </AppContextProvider>
      </AuthContextProvider>
    </NavigationContainer>
  );
};
