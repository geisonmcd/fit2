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
MaterialIcons.loadFont();

export default function Timetable({ navigation }) {
    const { } = useAuthContext();
    const { } = useAppContext();
    const route = useRoute();

    const { timetable } = route.params;


    useEffect(() => {
    }, []);

    return (
        <View>
            <Page
                type="static"
                title={translate('Timetable')}
                smallTitle={translate('Diaries')}
            >
                <View style={{padding: 10}}>
                    <Text>{timetable.name}</Text>
                </View>
            </Page>
        </View>
    );
}
const styles = StyleSheet.create({
   
});


