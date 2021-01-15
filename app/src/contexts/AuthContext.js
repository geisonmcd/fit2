import React, { createContext, useContext, useReducer, useState, useEffect } from 'react';
import LocalStorage from '../configs/LocalStorage';
import authService from '../services/authService';

const INITIAL_STATE = {
  token: null,
  session: null,
  role: null,
  isAuthenticated: false,
  isLoading: true
};

const AuthContext = createContext({
  ...INITIAL_STATE,
  loadSession: () => null,
  setActiveRole: () => null,
  signIn: () => null,
  signOut: () => null
});

function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used by an AuthContextProvider');
  }
  return context;
}

function AuthContextProvider({ children }) {
  const [isAlreadyRestored, setIsAlreadyRestored] = useState(false);
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'RESTORE_AUTH_CONTEXT':
        return { ...state, token: action.token, session: action.session, role: action.role, isAuthenticated: !!action.token && !!action.session, isLoading: false };
      case 'LOAD_SESSION':
        return { ...state, session: action.session };
      case 'SET_ACTIVE_ROLE':
        return { ...state, role: action.role };
      case 'SIGN_IN':
        return { ...state, token: action.token, isAuthenticated: !!action.token && !!state.session };
      case 'SIGN_OUT':
        return { ...state, token: null, session: null, role: null, isAuthenticated: false, isLoading: false };
      default:
        return state;
    }
  }, INITIAL_STATE);

  async function loadSession() {
    const session = await authService.getSession();
    console.log('voltou da sessão');
    await LocalStorage.set('session', session);
    dispatch({ type: 'LOAD_SESSION', session });
    return session;
  }

  async function setActiveRole(role) {
    await LocalStorage.set('role', role);
    dispatch({ type: 'SET_ACTIVE_ROLE', role });
  }

  async function signIn(username, password) {
    try {
      const token = await authService.authenticate(username, password);
      await LocalStorage.set('token', token);
      const session = await loadSession();
      await setActiveRole(session.user.roles.length === 1 ? session.user.roles[0] : null);
      dispatch({ type: 'SIGN_IN', token });
    } catch (error) {
      console.log(error);
    }
  }

  async function signOut() {
    await LocalStorage.clear();
    dispatch({ type: 'SIGN_OUT' });
  }

  useEffect(() => {
    async function init() {
      try {
        const { token, session, role } = await LocalStorage.getMany(['role', 'token', 'session']);
        setIsAlreadyRestored(true);
        dispatch({ type: 'RESTORE_AUTH_CONTEXT', token, session, role });
      } catch (error) {
        console.log(error);
      }
    }
    if (!isAlreadyRestored) {
      init();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, loadSession, setActiveRole, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContextProvider, useAuthContext };
