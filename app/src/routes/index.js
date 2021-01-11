import React from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import { SplashScreen, SwitchProfile } from '../screens/public';
import StudentRoutes from './student';
import ProfessorRoutes from './professor';
import PublicRoutes from './public';
import { Text, View } from 'react-native';


export default function Routes() {
  let { isAuthenticated, isLoading, role } = useAuthContext();

  if (isLoading) {
    return <SplashScreen />;
  }

  role = 'PROFESSOR';

  if (isAuthenticated) {
    if (role) {
      return role === 'STUDENT' ? <StudentRoutes /> : <ProfessorRoutes />;
    }
    // return <SwitchProfile />
  }

  return <PublicRoutes />;
}