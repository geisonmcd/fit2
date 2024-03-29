import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { translate } from '../../../translate';
import { useAuthContext } from '../../../contexts/AuthContext';
import { Button } from '../../../components';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
MaterialIcons.loadFont();

export default function SignIn() {

  let professor = true;
  const [username, setUsername] = professor ? useState('a') : useState('b');
  const [password, setPassword] = useState('a');


  const { signIn } = useAuthContext();

  return (
    <View style={styles.container}>
      <TextInput style={styles.textInput} placeholder={translate('Type your e-mail')} placeholderTextColor="#fff" textContentType="username" autoCapitalize="none" value={username} onChangeText={setUsername} />
      <TextInput style={styles.textInput} placeholder={translate('Type your password')} placeholderTextColor="#fff" textContentType="password" autoCapitalize="none" value={password} onChangeText={setPassword} secureTextEntry />
      <Button style={styles.button} title={translate('Sign in')} onPress={() => signIn(username, password)} requestFeedback />
    </View>
  );
}

const styles = StyleSheet.create({
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
  }
});
