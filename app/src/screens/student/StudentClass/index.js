import React, { useState, useEffect } from 'react';
import { FlatList, View, Pressable, Modal, Text, StyleSheet, TextInput, Dimensions } from 'react-native';
import { useNavigation, useTheme, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { translate } from '../../../translate';
import { Button, Picker, Page, UserAvatar } from '../../../components';
import api from '../../../services/api';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useAppContext } from '../../../contexts/AppContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

MaterialIcons.loadFont();

export default function StudentClass({ navigation }) {

    const { session } = useAuthContext();
    const { } = useAppContext();
    const { system } = useTheme();
    let { width } = Dimensions.get('window');
    let [events, setEvents] = useState([]);
    let [classUsers, setClassUsers] = useState([]);
    const route = useRoute();
    const { clazz } = route.params;

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        let users = await api.fit.classes.users.list(clazz.idClass);
        setClassUsers(users.data)
    };

    const confirmAttendance = async () => {
        let users = await api.fit.classes.confirmAttendance(clazz.idClass, session.idUser);
        setClassUsers(users.data)
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'beige', height: 150}}>
                <View style={{ justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={[styles.title]}>{clazz.title}</Text>
                    <Text style={[styles.title]}>{clazz.summary}</Text>
                    <Text style={[styles.title]}>{moment(clazz.start).format('hh:mm') + ' - ' + moment(clazz.end).format('hh:mm')}</Text>
                </View>
            </View>
            <View style={{  backgroundColor: 'pink', paddingVertical: 20}}>
                {classUsers && classUsers.map((classUser) => {
                    return (
                        <View key={classUser.idUser} style={{flexDirection: 'row', alignItems: 'center', paddingBottom: 10}}>
                            <UserAvatar style={{ marginHorizontal: 10 }} hash={null} size={35} />
                            <Text >{classUser.name}</Text>
                        </View>
                    )
                })}
                {[...Array(clazz.vacancies - classUsers.length)].map((x, i) =>
                    <View key={i} style={{flexDirection: 'row', alignItems: 'center', paddingBottom:10}}>
                        <UserAvatar style={{ marginHorizontal: 10 }} hash={null} size={35} />
                        <Text >Disponível</Text>
                    </View>
                )}
            </View>
            {/* TODO: desconfirmar presença se estiver confirmada */}
            <Button style={{ }} title={'Confirmar Presença'} onPress={() => confirmAttendance()} />
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


