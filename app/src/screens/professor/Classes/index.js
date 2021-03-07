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
MaterialIcons.loadFont();

export default function Classes({ navigation }) {

    const { } = useAuthContext();
    const { } = useAppContext();
    const { system } = useTheme();
    const [timetables, setTimetables] = useState([]);
    const [idSelectedTimetable, setIdSelectedTimetable] = useState([]);

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
                    <View style={[styles.period, { borderColor: system.separator.opaque, borderTopWidth: 0, backgroundColor: '#FFFFFF' }]}>
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
                            onChange={(newValue) => console.log(newValue)}
                        />
                    </View>
                    <View style={{ borderColor: system.separator.opaque, borderTopWidth: 0, backgroundColor: '#FFFFFF' }}>
                        <Text style={[{ color: system.label.primary, flex: 1 }]} numberOfLines={1}>Período</Text>
                        {/* <View style={{ justifyContent: 'space-between'}}>
                            <Pressable style={{ backgroundColor: 'green', height: 10 }}>
                                <Text>Asdf</Text>
                            </Pressable>
                            <Pressable style={{ backgroundColor: 'green', height: 10, marginHorizontal: 5 }}>
                                <Text>Asdf</Text>
                            </Pressable>
                        </View> */}
                        {/* {show && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode={mode}
                                is24Hour={true}
                                display="default"
                                onChange={onChange}
                            />
                        )} */}
                    </View>
                </View>
            </Page>
        </View>
    );
}
const styles = StyleSheet.create({
    picker: {
        fontSize: 15,
        backgroundColor: '#FFFFFF',
        marginVertical: 0,
        borderWidth: 0,
        borderRadius: 0,
        paddingVertical: 0,
        maxWidth: Dimensions.get('screen').width / 2
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 50,
        backgroundColor: '#444950'
    },
    textInput: {
        borderWidth: 0,
        borderRadius: 4,
        paddingHorizontal: 20,
        paddingVertical: 15,
        fontSize: 16,
        marginBottom: 4,
        backgroundColor: '#575e67',
        color: '#fff'
    },
    button: {
        paddingVertical: 15,
        marginVertical: 1
    },

    itemContainer: {
        justifyContent: 'center',
        borderWidth: 0
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 16,
        paddingVertical: 12,
        marginLeft: 5,
        borderBottomWidth: 0.5,
    },
    itemText: {
        fontSize: 17,
        flexGrow: 1
    },
    itemIcon: {}
});


