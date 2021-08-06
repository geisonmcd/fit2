import React, { useState, useEffect } from 'react';
import { FlatList, View, Pressable, ActivityIndicator, Modal, Text, StyleSheet, Dimensions } from 'react-native';
import { Formik } from 'formik';
import { useNavigation, useTheme } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { translate } from '../../../translate';
import { Page } from '../../../components';
import { Picker } from '../../../components';
import { Button, TextInput } from 'react-native-paper';

import api from '../../../services/api';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useAppContext } from '../../../contexts/AppContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import Toast from 'react-native-simple-toast';


MaterialIcons.loadFont();

export default function AddUsers({ navigation }) {

  const { } = useAuthContext();
  const { } = useAppContext();
  const [name, setName] = useState("");
  const [hide, setHide] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  let { width } = Dimensions.get('window');

  useEffect(() => {
  }, []);



  const addClient = async () => {
    setLoading(true);
    console.log('1')
    api.fit.users.addUser({ name, username, password, role: 'client' }).then(() => {
      Toast.show("Aluno salvo!]", Toast.LONG);
    }).catch((error) => {
      Toast.show("Erro ao inserir aluno!]", Toast.LONG);
    }).finally(() => {
      setLoading(false);
      setName("");
      setUsername("");
      setPassword("");
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <Page
        type="static"
        title={'Adicionar Aluno'}
        smallTitle={translate('Diaries')}
        noDataIcon="book"
        noDataMessage={translate('There\'s no diary')}
      >
        <View style={{ padding: 10 }}>
          <View style={{ marginTop: 20 }}>
            <TextInput
              label="Nome"
              mode="flat"
              value={name}
              onChangeText={name => setName(name)}
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <TextInput
              label="Username"
              mode="flat"
              value={username}
              onChangeText={username => setUsername(username)}
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <TextInput
              label="Password"
              secureTextEntry={hide}
              right={<TextInput.Icon name="eye" onPress={() => setHide(!hide)} />}
              value={password}
              onChangeText={password => setPassword(password)}
            />
          </View>
          <View style={{ marginTop: 20 }}>
            {loading ?
              <ActivityIndicator size="large" color="#00ff00" />
              :
              <Button icon="content-save" mode="contained" onPress={addClient}>
                Salvar
              </Button>
            }
          </View>
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
  },
  numberInput: {
    borderWidth: 1,
    textAlign: 'right',
    fontSize: 16
  }
});


