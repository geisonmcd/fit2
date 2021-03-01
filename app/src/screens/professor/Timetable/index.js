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
    const [startTime, setStartTime] = useState(new Date())
    const [endTime, setEndTime] = useState(new Date())
    const [timetableSlots, setTimetableSlots] = useState([])
    const { system } = useTheme();

    useEffect(() => {
    }, []);

    async function addTimes() {
        setTimetableSlots([...timetableSlots, { startTime, endTime }]);
        await api.fit.timetableSlot.save({ idTimetableSlot: timetable.idTimetableSlot, startTime, endTime });
    }

    function renderItem({ item, index }) {
        return (
            <Pressable onPress={() => navigation.navigate('Timetable', { timetable: item })}>
                <View style={[styles.itemContainer, { backgroundColor: '#eee', height: 50, justifyContent: 'center'}]}>
                    <View style={[styles.item, { borderColor: system.separator.opaque, flexDirection: 'row', justifyContent: 'space-around'}]}>
                        <Text style={[styles.itemText, { color: system.label.primary }]}>{Moment(item.startTime).format('hh:mm')}</Text>
                        <Text style={[styles.itemText, { color: system.label.primary }]}>{Moment(item.endTime).format('hh:mm')}</Text>
                    </View>
                </View>
            </Pressable>
        );
    }

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
                                    date={startTime}
                                    onDateChange={setStartTime}
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
                                    date={startTime}
                                    onDateChange={setEndTime}
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
                                <Text style={styles.textInput} placeholderTextColor="#fff" >{Moment(startTime).format('hh:mm')} </Text>
                            </Pressable>
                            <Pressable onPress={() => setEndModalVisible(true)}>   
                                <Text style={styles.textInput} placeholderTextColor="#fff" >{Moment(endTime).format('hh:mm')} </Text>
                            </Pressable>
                        </View>
                    </View>
                    <Button style={styles.button} title={'Add slot'} onPress={() => addTimes()} />
                    <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        data={timetableSlots}
                        renderItem={renderItem}
                        ListEmptyComponent={() => (
                            <View style={{
                                flexGrow: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 16,
                                marginBottom: 60
                            }}>
                                <Text>Sem Dados</Text>
                            </View>
                        )}
                        scrollEventThrottle={20}
                        showsVerticalScrollIndicator={false}
                        onEndReachedThreshold={0.3}
                    />
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