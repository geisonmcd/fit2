import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppContextProvider } from './contexts/AppContext';
import { AuthContextProvider } from './contexts/AuthContext';
import Routes from './routes';

export default function App() {
 
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <AppContextProvider>
          <Routes />
        </AppContextProvider>
      </AuthContextProvider>
    </NavigationContainer>
  );
};
