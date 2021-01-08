import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { DrawerItem } from '@react-navigation/drawer';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Picker from '../Picker';
import { translate } from '../../translate';
import api from '../../services/api';
import { useAuthContext } from '../../contexts/AuthContext';
import { useAppContext } from '../../contexts/AppContext';
import moment from 'moment';
FontAwesome.loadFont();

export default function DrawerStudent({ state, navigation, descriptors, progress, signOut }) {
  const { idCustomer, idInstitution, idAcademicCalendar, idCourse, idEnrollment, idPeriod, diaries, onChangeCustomer, onChangeInstitution, onChangeAcademicCalendar, onChangeCourse, onChangeEnrollment, onChangePeriod, onChangeDiaries } = useAppContext();
  const { session } = useAuthContext();
  const [originalEnrollments, setOriginalEnrollments] = useState([]);
  const [originalPeriods, setOriginalPeriods] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [periods, setPeriods] = useState([]);
  const icons = {
    // Classroom
    'Diaries': 'book',
    'Calendar': 'calendar',
    'Timeline': 'comments-o',
    'Incidents': 'address-book',
    'Enrollments': 'user',
    'Financial': 'usd',
    'Evaluation Forms': 'list-ol',
    // APP ATUAL
    // 'Grupos de Discussão': '',
    // 'Calendário': '',
    // 'Conteúdos': '',
    // 'Frquências': '',
    // 'Notas': '',
    // 'Pareceres Descritivos': '',
    // 'Financeiro': '',
  };

  useEffect(() => {
    async function getEnrollments(idUser) {
      const response = await api.classroom.users.enrollments.list(idUser);
      const list = response.data.map(enrollment => ({
        key: enrollment.idEnrollment,
        label: `${enrollment.idEnrollment} - ${enrollment.course.name}`,
        value: enrollment.idEnrollment
      }));
      setEnrollments(list);
      setOriginalEnrollments(response.data);
    }
    if (session.user.idUser) {
      getEnrollments(session.user.idUser);
    }
  }, [session.user]);

  useEffect(() => {
    async function getPeriods(idInstitution, idAcademicCalendar) {
      const response = await api.classroom.institutions.periods.list(idInstitution, idAcademicCalendar);
      const orderedPeriods = response.data.sort((actual, next) => moment(actual.startDate).diff(moment(next.startDate)));
      const list = orderedPeriods.map(period => ({
        key: period.id,
        label: period.name,
        value: period.id
      }));
      setPeriods(list);
      setOriginalPeriods(orderedPeriods);
    }
    if (idInstitution && idAcademicCalendar && idEnrollment) {
      getPeriods(idInstitution, idAcademicCalendar);
    }
  }, [idInstitution, idAcademicCalendar, idEnrollment]);

  useEffect(() => {
    async function getDiaries(idEnrollment, idPeriod, list) {
      const enrollment = list.find(enrollment => enrollment.idEnrollment === idEnrollment);
      const filteredDiaries = enrollment?.diaries.filter(diary => diary.diaryPeriods.some(diaryPeriod => diaryPeriod.idPeriod === idPeriod));
      await onChangeDiaries(filteredDiaries);
    }
    if (idEnrollment && idPeriod) {
      getDiaries(idEnrollment, idPeriod, originalEnrollments);
    }
  }, [idEnrollment, idPeriod, originalEnrollments]);

  // useEffect(() => {
  //   function getActivePeriod(periods) {
  //     const now = moment();
  //     if (now.isBefore(moment(periods[0].value.startDate))) {
  //       return periods[0];
  //     }
  //     if (now.isAfter(moment(periods[periods.length - 1].value.endDate))) {
  //       return periods[periods.length - 1];
  //     }
  //     return periods.find(period => now.isBetween(moment(period.value.startDate), moment(period.value.endDate))) || periods[periods.length - 1];
  //   }
  //   if (periods.length) {
  //     if (!idPeriod) {
  //       const selected = getActivePeriod(periods);
  //       console.log('Não tem período selecionado.', selected);
  //       // onChangePeriodHandler(selected);
  //     }
  //   }
  // }, [periods]);

  async function onChangeEnrollmentHandler(newValue) {
    setPeriods([]);
    const selected = originalEnrollments.find(e => e.idEnrollment === newValue);
    await onChangeEnrollment(newValue);
    await onChangeCustomer(selected?.idCustomer);
    await onChangeInstitution(selected?.idInstitution);
    await onChangeAcademicCalendar(selected?.academicCalendar.idAcademicCalendar);
    await onChangeCourse(selected?.course.idCourse);
  }

  async function onChangePeriodHandler(newValue) {
    await onChangeDiaries([]);
    await onChangePeriod(newValue);
  }

  return (
    <View style={{flex: 1}}>
      <View style={{backgroundColor: '#eee', paddingHorizontal: 10, paddingTop: 0, marginBottom: 20}}>
        <Picker
          name={'enrollments'}
          placeholder={translate('Select the enrollment')}
          list={enrollments}
          selected={idEnrollment}
          disabled={!enrollments.length}
          visible={true}
          doneText={translate('Select')}
          onChange={(newValue) => onChangeEnrollmentHandler(newValue)}
        />
        <Picker
          name={'periods'}
          placeholder={translate('Select the period')}
          list={periods}
          selected={idPeriod}
          disabled={!periods.length}
          visible={true}
          doneText={translate('Select')}
          onChange={(newValue) => onChangePeriodHandler(newValue)}
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

const styles = StyleSheet.create({
  header: {
    marginTop: 40,
    marginHorizontal: 10
  },
  body: {

  },
  footer: {
    marginBottom: 30,
    marginHorizontal: 10
  },
  signOutButton: {
    marginTop: 10,
  },
  versionLabel: {
    textAlign: 'center',
    paddingTop: 5,
    fontSize: 10,
    color: '#777'
  }
});
