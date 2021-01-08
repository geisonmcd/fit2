import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { DrawerItem } from '@react-navigation/drawer';
import { useAuthContext } from '../../contexts/AuthContext';
import { useAppContext } from '../../contexts/AppContext';
import { translate } from '../../translate';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Picker from '../Picker';
import api from '../../services/api';
FontAwesome.loadFont();

export default function DrawerProfessor({ state, navigation, descriptors, progress }) {
  const { idCustomer, idInstitution, idAcademicCalendar, idCourse, onChangeCustomer, onChangeInstitution, onChangeAcademicCalendar, onChangeCourse, onChangeDiaries } = useAppContext();
  const { session } = useAuthContext();
  const [customers, setCustomers] = useState([]);
  // const [customers, setCustomers] = useState(session.customers.map(customer => ({
  //   key: customer.idCustomer,
  //   label: customer.name,
  //   value: customer.idCustomer
  // })));
  const [institutions, setInstitutions] = useState([]);
  // const [institutions, setInstitutions] = useState(session.institutions.map(institution => ({
  //   key: institution.idInstitution,
  //   label: institution.name,
  //   value: institution.idInstitution
  // })));
  const [academicCalendars, setAcademicCalendars] = useState([]);
  const [courses, setCourses] = useState([]);
  const [diaries, setDiaries] = useState([]);
  const icons = {
    'Diaries': 'book',
    'Calendar': 'calendar',
    'Timeline': 'comments-o',
    'Incidents': 'address-book',
  };

  useEffect(() => {
    const list = session.customers.map(customer => ({
      key: customer.idCustomer,
      label: customer.name,
      value: customer.idCustomer
    }));
    if (JSON.stringify(list) !== JSON.stringify(customers)) {
      setCustomers(list);
    }
  }, [session]);

  useEffect(() => {
    const list = session.institutions.map(institution => ({
      key: institution.idInstitution,
      label: institution.name,
      value: institution.idInstitution
    }));
    if (JSON.stringify(list) !== JSON.stringify(institutions) && idCustomer) {
      setInstitutions(list);
    }
  }, [idCustomer, session]);

  useEffect(() => {
    async function getDiaries(idInstitution) {
      const response = await api.classroom.institutions.diaries.list(idInstitution);
      setDiaries(response.data);
      return response.data;
    }
    async function getAcademicCalendars(idInstitution) {
      const data = await getDiaries(idInstitution);
      const list = removeDuplicates(data.map(item => ({
        key: item.academicCalendar.idAcademicCalendar,
        label: item.academicCalendar.name,
        value: item.academicCalendar.idAcademicCalendar
      })), 'value');
      setAcademicCalendars(list);

    }
    if (idInstitution) {
      getAcademicCalendars(idInstitution);
    }
  }, [idInstitution]);

  useEffect(() => {
    if (idAcademicCalendar && diaries) {
      const data = diaries.filter(item => item.academicCalendar.idAcademicCalendar === idAcademicCalendar);
      const list = removeDuplicates(data.map(item => ({
        key: item.course.idCourse,
        label: item.course.name,
        value: item.course.idCourse
      })), 'value');
      setCourses(list);
    }
  }, [idAcademicCalendar, diaries]);

  useEffect(() => {
    async function filterDiaries(idAcademicCalendar, idCourse, diaries) {
      const filteredDiaries = diaries.filter(diary => diary.academicCalendar.idAcademicCalendar === idAcademicCalendar && diary.course.idCourse === idCourse);
      console.log(JSON.stringify(filteredDiaries, null, 2));
      await onChangeDiaries(filteredDiaries);
    }
    if (idAcademicCalendar && idCourse && diaries) {
      filterDiaries(idAcademicCalendar, idCourse, diaries);
    }
  }, [idAcademicCalendar, idCourse, diaries]);

  function removeDuplicates(list, key) {
    return [...new Map(list.map(item => [item[key], item])).values()];
  }

  async function onChangeCustomerHandler(newValue) {
    // if (newValue !== idCustomer) {
      setInstitutions([]);
      // setAcademicCalendars([]);
      // setCourses([]);
      // await onChangeInstitution(null);
      await onChangeCustomer(newValue);
      // await onChangeAcademicCalendar(null);
      // await onChangeCourse(null);
    // }
  }

  async function onChangeInstitutionHandler(newValue) {
    // if (newValue !== idInstitution) {
      setAcademicCalendars([]);
      // setCourses([]);
      // await onChangeAcademicCalendar(null);
      await onChangeInstitution(newValue);
      // await onChangeCourse(null);
    // }
  }

  async function onChangeAcademicCalendarHandler(newValue) {
    // if (newValue !== idAcademicCalendar) {
      setCourses([]);
      // await onChangeCourse(null);
      await onChangeAcademicCalendar(newValue);
    // }
  }

  async function onChangeCourseHandler(newValue) {
    // if (newValue !== idCourse) {
      await onChangeCourse(newValue);
    // }
  }

  return (
    <View style={{flex: 1}}>
      <View style={{backgroundColor: '#eee', paddingHorizontal: 10, paddingTop: 0, marginBottom: 20}}>
        <Picker
          name={'customers'}
          placeholder={translate('Select the customer')}
          list={customers}
          selected={idCustomer}
          disabled={!customers.length}
          // visible={customers.length > 1}
          // visible={true}
          doneText={translate('Select')}
          onChange={(newValue) => onChangeCustomerHandler(newValue)}
        />
        <Picker
          name={'institutions'}
          placeholder={translate('Select the institution')}
          list={institutions}
          selected={idInstitution}
          disabled={!institutions.length}
          // visible={institutions.length > 1}
          // visible={true}
          doneText={translate('Select')}
          onChange={(newValue) => onChangeInstitutionHandler(newValue)}
        />
        <Picker
          name={'academicCalendars'}
          placeholder={translate('Select the academic calendar')}
          list={academicCalendars}
          selected={idAcademicCalendar}
          disabled={!academicCalendars.length}
          // visible={academicCalendars.length > 1}
          // visible={true}
          doneText={translate('Select')}
          onChange={(newValue) => onChangeAcademicCalendarHandler(newValue)}
        />
        <Picker
          name={'courses'}
          placeholder={translate('Select the course')}
          list={courses}
          selected={idCourse}
          disabled={!courses.length}
          // visible={courses.length > 1}
          // visible={true}
          doneText={translate('Select')}
          onChange={(newValue) => onChangeCourseHandler(newValue)}
        />
      </View>
      <Text style={{fontSize: 16, color: '#777', fontWeight: '200', marginHorizontal: 10, marginBottom: 6}}>Menu</Text>
      <ScrollView style={{paddingHorizontal: 10}}>
        {state.routes.map(route => {
          return (
            <DrawerItem
              style={{ marginHorizontal: 0 }}
              labelStyle={{}}
              focused={state.routeNames[state.index] === route.name}
              key={route.key}
              label={translate(route.name)}
              icon={({ focused, color, size }) => <FontAwesome color={color} size={20} name={icons[route.name]} />}
              onPress={() => navigation.navigate(route)}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
