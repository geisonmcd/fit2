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

export default function DrawerManager({ state, navigation, descriptors, progress }) {
    const { idCustomer, idInstitution, idAcademicCalendar, idCourse, onChangeCustomer, onChangeInstitution, onChangeAcademicCalendar, onChangeCourse, onChangeDiaries } = useAppContext();
    const { session } = useAuthContext();
    const [customers, setCustomers] = useState([]);
    const [institutions, setInstitutions] = useState([]);
    const [academicCalendars, setAcademicCalendars] = useState([]);
    const [courses, setCourses] = useState([]);
    const [diaries, setDiaries] = useState([]);
    const icons = {
        'Diaries': 'book',
        'Calendar': 'calendar',
        'Timeline': 'comments-o',
        'Timetables': 'clock-o',
        'Classes': 'book',
        'GenerateClasses': 'codepen',
        'AddUsers': 'users',
    };

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
            await onChangeDiaries(filteredDiaries);
        }
        if (idAcademicCalendar && idCourse && diaries) {
            filterDiaries(idAcademicCalendar, idCourse, diaries);
        }
    }, [idAcademicCalendar, idCourse, diaries]);

    function removeDuplicates(list, key) {
        return [...new Map(list.map(item => [item[key], item])).values()];
    }

    return (
        <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 16, color: '#777', fontWeight: '200', marginHorizontal: 10, marginBottom: 6 }}>Menu</Text>
            <ScrollView style={{ paddingHorizontal: 10 }}>
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
