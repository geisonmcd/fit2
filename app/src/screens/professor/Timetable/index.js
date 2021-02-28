import React, { useState, useEffect } from 'react';
import { FlatList, View, Pressable, Modal, Text, StyleSheet, TextInput } from 'react-native';

import { translate } from '../../../translate';
import { Page } from '../../../components';
import { Button } from '../../../components';
import api from '../../../services/api';
import { useNavigation, useTheme, useRoute } from '@react-navigation/native';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useAppContext } from '../../../contexts/AppContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'react-native-date-picker'
import Moment from 'moment';

MaterialIcons.loadFont();

export default function Timetable({ navigation }) {

    const { } = useAuthContext();
    const { } = useAppContext();
    const route = useRoute();
    const [startModalVisible, setStartModalVisible] = useState(false);
    const [endModalVisible, setEndModalVisible] = useState(false);
    const { timetable } = route.params;
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())

    useEffect(() => {
    }, []);

    return (
        <View>
            <Page
                type="static"
                title={translate('Timetable')}
                subtitle={timetable.name}
                smallTitle={translate('Diaries')}
            >
                <View style={{ padding: 10 }}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={startModalVisible}
                    >
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <View style={[styles.modalView, { elevation: 5, backgroundColor: '#eee', }]}>
                                <DatePicker
                                    date={startDate}
                                    onDateChange={setStartDate}
                                    mode="time"
                                />
                                <Button style={styles.button} title={'OK'} onPress={() => setStartModalVisible(false)} />
                            </View>
                        </View>
                    </Modal>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={endModalVisible}
                    >
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <View style={[styles.modalView, { elevation: 5, backgroundColor: '#eee', }]}>
                                <DatePicker
                                    date={startDate}
                                    onDateChange={setEndDate}
                                    mode="time"
                                />
                                <Button style={styles.button} title={'OK'} onPress={() => setEndModalVisible(false)} />
                            </View>
                        </View>
                    </Modal>
                    <View style={{ justifyContent: 'center' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <Text style={{ color: 'black', paddingLeft: 5, fontSize: 16 }} >Start Date</Text>
                            <Text style={{ color: 'black', paddingLeft: 5, fontSize: 16 }} >End Date</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <Pressable onPress={() => setStartModalVisible(true)}>
                                <Text style={styles.textInput} placeholderTextColor="#fff" >{Moment(startDate).format('hh:mm')} </Text>
                            </Pressable>
                            <Pressable onPress={() => setEndModalVisible(true)}>   
                                <Text style={styles.textInput} placeholderTextColor="#fff" >{Moment(endDate).format('hh:mm')} </Text>
                            </Pressable>
                        </View>
                    </View>
                    <Button style={styles.button} title={'ADD'} onPress={() => setModalVisible(false)} />
                </View>
            </Page>
        </View>
    );
}
const styles = StyleSheet.create({
    textInput: {
        borderWidth: 0,
        borderRadius: 4,
        paddingHorizontal: 20,
        paddingVertical: 15,
        fontSize: 16,
        marginBottom: 4,
        backgroundColor: '#575e67',
        color: '#fff',
        textAlign: 'center'
    },
});