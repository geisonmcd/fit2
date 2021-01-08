import React from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import { SplashScreen, SwitchProfile } from '../screens/public';
import StudentRoutes from './student';
import ProfessorRoutes from './professor';
import PublicRoutes from './public';

export default function Routes() {
  const { isAuthenticated, isLoading, role } = useAuthContext();

  if (isLoading) {
    return <SplashScreen />;
  }

  if (isAuthenticated) {
    if (role) {
      return role === 'STUDENT' ? <StudentRoutes /> : <ProfessorRoutes />;
    }
    return <SwitchProfile />
  }

  return <PublicRoutes />;
}