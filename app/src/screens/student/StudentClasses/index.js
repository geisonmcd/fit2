import React, { useState, useEffect } from 'react';
import { FlatList, View, Pressable, Modal, Text, StyleSheet, TextInput, Dimensions } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { translate } from '../../../translate';
import { Button, Picker, Page } from '../../../components';
import api from '../../../services/api';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useAppContext } from '../../../contexts/AppContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

MaterialIcons.loadFont();

export default function StudentClasses({ navigation }) {

    const { } = useAuthContext();
    const { } = useAppContext();
    const { system } = useTheme();
    let { width } = Dimensions.get('window');
    let [events, setEvents] = useState([]);
    let [date, setDate] = useState(new Date());

    let getClasses = async function () {
        let classes = await api.fit.classes.list(date);
        classes = classes.data.map(function (clazz) {
            return {
                key: clazz.idClass.toString(),
                idClass: clazz.idClass,
                start: clazz.startTime,
                end: clazz.endTime,
                locked: clazz.locked,
                title: 'jujuba',
                summary: 'já pensou filhão',
                vacancies: clazz.vacancies
            }
        })
        setEvents(classes);
    }

    useEffect(() => {
        getClasses();
    }, [date]);

    const renderItem = ({ item }) => (
        <Pressable style={[styles.item, {backgroundColor: item.locked ? '#f9c2ff' : '#639CBF'}]}
        onPress={() => navigation.navigate('StudentClass', { clazz: item })}
        >
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.title}>{item.summary}</Text>
            <Text style={[styles.title]}>{moment(item.start).format('hh:mm') + ' - ' + moment(item.end).format('hh:mm')}</Text>
            <Text style={[styles.title]}>{item.vacancies}</Text>
        </Pressable>
    );

    const forwardOneDay = async () => {
        let a = moment(date);
        let b = a.add(1, 'days');
        let c = b.toDate();
        setDate(new Date(b));
    }

    const rewindOneDay = async () => {
        let a = moment(date);
        let b = a.subtract(1, 'days');
        let c = b.toDate();
        setDate(new Date(b));
    }

    const unlockClasses = async () => {
        await api.fit.classes.unlock(date);
        getClasses();
    }
   
    const lockClasses = async () => {
        await api.fit.classes.lock(date);
        getClasses();
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ backgroundColor: '#eeee', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                <MaterialIcons style={{}} name="keyboard-arrow-left" color={system.label.primary} size={36} onPress={rewindOneDay} />
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{moment(date).format('DD/MM/yyyy')}</Text>
                <MaterialIcons style={{}} name="keyboard-arrow-right" color={system.label.primary} size={36} onPress={forwardOneDay} />
            </View>
            <FlatList
                data={events}
                renderItem={renderItem}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20}}>
                {/* <Button style={{ height: 60, backgroundColor: '#f9c2ff' }} title={'Trancar Aulas'} onPress={() => lockClasses()} />
                <Button style={{ height: 60 }} title={'Liberar Aulas'} onPress={() => unlockClasses()} /> */}
            </View>
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
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 18,
    },
});


