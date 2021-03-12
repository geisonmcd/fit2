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

    return (
        <View>
            <Page
                type="static"
                title={'Gerar aulas'}
                smallTitle={translate('Diaries')}
                noDataIcon="book"
                noDataMessage={translate('There\'s no diary')}
            >
                <View style={{ padding: 10 }}>
                    <View style={[{}, {}]}>
                        <Picker
                            style={styles.picker}
                            disabledStyle={styles.pickerDisabled}
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
    }
});


