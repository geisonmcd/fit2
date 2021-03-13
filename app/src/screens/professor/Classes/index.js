import React, { useState, useEffect } from 'react';
import { FlatList, View, Pressable, Modal, Text, StyleSheet, TextInput, Dimensions } from 'react-native';
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

import EventCalendar from 'react-native-events-calendar'

MaterialIcons.loadFont();

export default function Classes({ navigation }) {

    const { } = useAuthContext();
    const { } = useAppContext();
    const { system } = useTheme();
    const [timetables, setTimetables] = useState([]);
    const [idSelectedTimetable, setIdSelectedTimetable] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showStartDate, setShowStartDate] = useState(false);
    const [showEndDate, setShowEndDate] = useState(false);
    let { width } = Dimensions.get('window')
    const events = [
        { start: '2017-09-07 00:30:00', end: '2017-09-07 01:30:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
        { start: '2017-09-07 01:30:00', end: '2017-09-07 02:20:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
        { start: '2017-09-07 04:10:00', end: '2017-09-07 04:40:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
        { start: '2017-09-07 01:05:00', end: '2017-09-07 01:45:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
        { start: '2017-09-07 14:30:00', end: '2017-09-07 16:30:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
        { start: '2017-09-08 01:20:00', end: '2017-09-08 02:20:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
        { start: '2017-09-08 04:10:00', end: '2017-09-08 04:40:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
        { start: '2017-09-08 00:45:00', end: '2017-09-08 01:45:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
        { start: '2017-09-08 11:30:00', end: '2017-09-08 12:30:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
        { start: '2017-09-09 01:30:00', end: '2017-09-09 02:00:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
        { start: '2017-09-09 03:10:00', end: '2017-09-09 03:40:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
        { start: '2017-09-09 00:10:00', end: '2017-09-09 01:45:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' }
    ]
    

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
        await api.fit.classes.generateClasses(idSelectedTimetable, startDate, endDate);
    };

    const rowHasChanged = async (r1, r2) => {
        return r1.name !== r2.name
      }

    return (
        <View style={{flex: 1}}>

            {/* <Page
                type="static"
                title={'Gerar aulas'}
                smallTitle={translate('Diaries')}
                noDataIcon="book"
                noDataMessage={translate('There\'s no diary')}
            >
                <View style={{ padding: 10 }}>
                    <View style={[{}, {}]}>
                        <Picker
                            placeholderTextColor="#007AFF"
                            placeholder={'Selecione o quadro de horários'}
                            placeholderEmptyData={translate('There\'s no option')}
                            list={timetables}
                            selected={idSelectedTimetable}
                            disabled={!timetables.length}
                            doneText={translate('Select')}
                            onChange={(newValue) => setIdSelectedTimetable(newValue)}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
                        <Pressable style={[styles.datePressable, {}]} onPress={() => setShowStartDate(true)}>
                            <Text>{moment(startDate).format('DD/MM/YY')}</Text>
                        </Pressable>
                        <Pressable style={styles.datePressable} onPress={() => setShowEndDate(true)}>
                            <Text>{moment(endDate).format('DD/MM/YY')}</Text>
                        </Pressable>
                        {showStartDate && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={startDate}
                                mode={'date'}
                                is24Hour={true}
                                display="default"
                                onChange={onChangeStartDate}
                            />
                        )}
                        {showEndDate && (
                            <DateTimePicker
                                testID="dateTimePicker2"
                                value={endDate}
                                mode={'date'}
                                is24Hour={true}
                                display="default"
                                onChange={onChangeEndDate}
                            />
                        )}
                    </View>
                    <View style={{ borderColor: system.separator.opaque, borderTopWidth: 0 }}>
                        <Text style={[{ color: 'black', flex: 1 }]} numberOfLines={1}>Período</Text>
                    </View>
                    <Button style={{ marginTop: 20 }} title={'Gerar'} onPress={() => generateClasses()} />
                </View>
              
            </Page> */}
                    <EventCalendar
      eventTapped={(e) => console.log(e)}
      events={events}
      width={width}
      initDate={'2017-09-08'}
    />
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
    }
});


