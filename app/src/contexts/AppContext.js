import React, { createContext, useContext, useReducer, useState, useEffect } from 'react';
import LocalStorage from '../configs/LocalStorage';
import api from '../services/api';
import { useAuthContext } from './AuthContext';

const INITIAL_STATE = {
  idCustomer: null,
  idInstitution: null,
  idAcademicCalendar: null,
  idCourse: null,
  idEnrollment: null,
  idPeriod: null,
  diaries: []
};

const AppContext = createContext({
  ...INITIAL_STATE,
  onChangeCustomer: () => null,
  onChangeInstitution: () => null,
  onChangeAcademicCalendar: () => null,
  onChangeCourse: () => null,
  onChangeEnrollment: () => null,
  onChangePeriod: () => null,
});

function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used by an AppContextProvider');
  }
  return context;
}

function AppContextProvider({ children }) {
  const { loadSession } = useAuthContext();
  const [isAlreadyRestored, setIsAlreadyRestored] = useState(false);
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'RESTORE_APP_CONTEXT':
        return { ...state, idCustomer: action.idCustomer, idInstitution: action.idInstitution, idAcademicCalendar: action.idAcademicCalendar, idCourse: action.idCourse, idEnrollment: action.idEnrollment, idPeriod: action.idPeriod };
      case 'CHANGE_CUSTOMER':
        return { ...state, idCustomer: action.idCustomer };
      case 'CHANGE_INSTITUTION':
        return { ...state, idInstitution: action.idInstitution };
      case 'CHANGE_ACADEMIC_CALENDAR':
        return { ...state, idAcademicCalendar: action.idAcademicCalendar };
      case 'CHANGE_COURSE':
        return { ...state, idCourse: action.idCourse };
      case 'CHANGE_ENROLLMENT':
        return { ...state, idEnrollment: action.idEnrollment };
      case 'CHANGE_PERIOD':
        return { ...state, idPeriod: action.idPeriod };
      case 'CHANGE_DIARIES':
        return { ...state, diaries: action.diaries };
      default:
        return state;
    }
  }, INITIAL_STATE);

  async function onChangeCustomer(idCustomer) {
    try {
      if (idCustomer) {
        await api.gennera.changeCustomer(idCustomer);
        await loadSession();
      }
      await LocalStorage.set('idCustomer', idCustomer);
      await onChangeInstitution(null),
      dispatch({ type: 'CHANGE_CUSTOMER', idCustomer });
    } catch (e) {
      console.log(e);
    }
  }

  async function onChangeInstitution(idInstitution) {
    try {
      await LocalStorage.set('idInstitution', idInstitution);
      await onChangeAcademicCalendar(null),
      dispatch({ type: 'CHANGE_INSTITUTION', idInstitution });
    } catch (e) {
      console.log(e);
    }
  }

  async function onChangeAcademicCalendar(idAcademicCalendar) {
    try {
      await LocalStorage.set('idAcademicCalendar', idAcademicCalendar);
      await onChangeCourse(null),
      dispatch({ type: 'CHANGE_ACADEMIC_CALENDAR', idAcademicCalendar });
    } catch (e) {
      console.log(e);
    }
  }

  async function onChangeCourse(idCourse) {
    try {
      await LocalStorage.set('idCourse', idCourse);
      dispatch({ type: 'CHANGE_COURSE', idCourse });
    } catch (e) {
      console.log(e);
    }
  }

  async function onChangeEnrollment(idEnrollment) {
    try {
      await LocalStorage.set('idEnrollment', idEnrollment);
      await onChangePeriod(null),
      dispatch({ type: 'CHANGE_ENROLLMENT', idEnrollment });
    } catch (e) {
      console.log(e);
    }
  }

  async function onChangePeriod(idPeriod) {
    try {
      await LocalStorage.set('idPeriod', idPeriod);
      dispatch({ type: 'CHANGE_PERIOD', idPeriod });
    } catch (e) {
      console.log(e);
    }
  }

  async function onChangeDiaries(diaries) {
    try {
      await LocalStorage.set('diaries', diaries);
      dispatch({ type: 'CHANGE_DIARIES', diaries });
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    async function init() {
      try {
        const data = await LocalStorage.getMany(['idCustomer', 'idInstitution', 'idAcademicCalendar', 'idCourse', 'idEnrollment', 'idPeriod']);
        setIsAlreadyRestored(true);
        dispatch({ type: 'RESTORE_APP_CONTEXT', ...data });
      } catch (e) {
        console.log(e);
      }
    };
    if (!isAlreadyRestored) {
      init();
    }
  }, []);

  return (
    <AppContext.Provider value={{ ...state, onChangeCustomer, onChangeInstitution, onChangeAcademicCalendar, onChangeCourse, onChangeEnrollment, onChangePeriod, onChangeDiaries }}>
      {children}
    </AppContext.Provider>
  );
}

export { AppContextProvider, useAppContext };
