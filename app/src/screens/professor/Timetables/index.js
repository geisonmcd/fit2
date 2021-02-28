import React, { useState, useEffect } from 'react';
import { View, Pressable, Modal, Text, StyleSheet, TextInput } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';

import { translate } from '../../../translate';
import { Page } from '../../../components';
import { Button } from '../../../components';
import api from '../../../services/api';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useAppContext } from '../../../contexts/AppContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
MaterialIcons.loadFont();

export default function Timetables() {
    const { } = useAuthContext();
    const { } = useAppContext();
    const [modalVisible, setModalVisible] = useState(false);
    const [timeTableName, setTimeTableName] = useState('');
    let [timetables, setTimeTables] = useState([]);

    const { system } = useTheme();

    useEffect(() => {

        let getTimetables = async function () {
            let timetables = await api.fit.timetables.list();
            setTimeTables(timetables.data)
        }
        getTimetables();
    }, []);

    async function addTimeTable() {
        console.log('chegou aqui');
        await api.fit.timetables.save({ name: timeTableName });
        setModalVisible(false);
        setTimeTableName('');
    }

    function renderItem({ item, index }) {
        return (
            <Pressable onPress={() => navigation.navigate('Timetable', { timetable: item })}>
                <View style={styles.itemContainer}>
                    <View style={[styles.item, { borderColor: system.separator.opaque, borderTopWidth: !index ? 0.5 : 0 }]}>
                        <Text style={[styles.itemText, { color: system.label.primary }]}>{item.name}</Text>
                        <MaterialIcons Pressablestyle={styles.itemIcon} name="chevron-right" size={23} color={system.separator.opaque} />
                    </View>
                </View>
            </Pressable>
        );
    }

    return (
        <View>
            <Page
                type="static"
                title={translate('Timetables')}
                smallTitle={translate('Diaries')}
                noDataIcon="book"
                noDataMessage={translate('There\'s no diary')}
                data={timetables}
                renderItem={renderItem}
            >
                <Button style={styles.button} title={'Adicionar Quadro de Horário'} onPress={() => setModalVisible(true)} />
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalVisible}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <TextInput style={styles.textInput} placeholder={'Nome do Quadro de horário'} placeholderTextColor="#fff" textContentType="name" autoCapitalize="none" value={timeTableName} onChangeText={setTimeTableName} />
                            <Button style={styles.button} title={'Fechar'} onPress={() => setModalVisible(false)} />
                            <Button style={styles.button} title={'Adicionar Quadro de Horário'} onPress={() => addTimeTable()} />
                        </View>
                    </View>
                </Modal>

            </Page>
        </View>
    );
}
const styles = StyleSheet.create({
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
        marginLeft: 16,
        borderBottomWidth: 0.5,
    },
    itemText: {
        fontSize: 17,
        flexGrow: 1
    },
    itemIcon: {}
});


