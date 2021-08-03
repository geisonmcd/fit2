import React, { useState, useEffect } from 'react';
import { FlatList, View, Pressable, ActivityIndicator, Modal, Text, StyleSheet, TextInput, Dimensions } from 'react-native';
import { Formik } from 'formik';
import { useNavigation, useTheme } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { translate } from '../../../translate';
import { Page } from '../../../components';
import { Button, Picker } from '../../../components';
import api from '../../../services/api';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useAppContext } from '../../../contexts/AppContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import Toast from 'react-native-simple-toast';


MaterialIcons.loadFont();

export default function AddUsers({ navigation }) {

  const { } = useAuthContext();
  const { } = useAppContext();
  const { system } = useTheme();
  const [timetables, setTimetables] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [idSelectedTimetable, setIdSelectedTimetable] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const [vacancies, setVacancies] = useState(4);
  let { width } = Dimensions.get('window')

  useEffect(() => {
    let getTimetables = async function () {
      let timetables = await api.fit.timetables.list();
      timetables = timetables.data.map(item => ({
        key: item.idTimetable,
        label: item.name,
        value: item.idTimetable
      }));
      setTimetables(timetables)
    }
    getTimetables();
  }, []);

  const onChangeStartDate = (event, selectedDate) => {
    if (event.type === "dismissed") {
      return;
    }
    setStartDate(selectedDate);
    setShowStartDate(false);
  };

  const onChangeEndDate = (event, selectedDate) => {
    if (event.type === "dismissed") {
      return;
    }
    setEndDate(selectedDate);
    setShowEndDate(false);
  };

  const generateClasses = async () => {
    setIsLoading(true);
    api.fit.classes.generateClasses(idSelectedTimetable, startDate, endDate, vacancies).then(() => {
      setIsLoading(false);
      Toast.show("Aulas geradas com sucesso!", Toast.LONG);
    });
  };

  return (
    <View style={{ flex: 1 }}>

      <Page
        type="static"
        title={'Gerar aulas'}
        smallTitle={translate('Diaries')}
        noDataIcon="book"
        noDataMessage={translate('There\'s no diary')}
      >
        <View style={{ padding: 10 }}>
          <View style={{ marginTop: 20 }}>
            <TextInput
              style={styles.numberInput}
              onChangeText={setVacancies}
              value={vacancies.toString()}
            />
          </View>
          {isLoading ?
            <ActivityIndicator size="large" color="#00ff00" />
            :
            <Button style={{ marginTop: 20 }} title={'Gerar'} onPress={() => generateClasses()} />
          }
        </View>

      </Page>
    </View>
  );
}
const styles = StyleSheet.create({
  datePressable: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 20,
    width: 180,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  numberInput: {
    borderWidth: 1,
    textAlign: 'right',
    fontSize: 16
  }
});


