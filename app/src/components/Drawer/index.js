import React from 'react';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';
import { useAuthContext } from '../../contexts/AuthContext';
import DrawerManager from './DrawerManager';
import DrawerStudent from './DrawerStudent';
import Button from '../Button';
import { translate } from '../../translate';
import { version } from '../../../package';


export default function Drawer(props) {
  let { session, role, signOut } = useAuthContext();
  // session = { user: { name: 'geison', email: 'geisonmcd@gmail.com ', username: 'geisoka'}}
  // const role = 'PROFESSOR'

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={{ width: Platform.select({ ios: 130, android: 110 }), height: Platform.select({ ios: 130, android: 110 }), marginBottom: 15, borderRadius: 10, borderWidth: 0, borderColor: '#a2a2a2', backgroundColor: '#a2a2a2' }} source={{ uri: `https://apps.gennera.com.br/public/users/photo?username=${session.username}` }} />
        <View style={{flexGrow: 1, alignItems: 'center'}}>
          <Text style={{fontWeight: '600', fontSize: 16, color: '#777', marginBottom: 2, textTransform: 'capitalize'}} numberOfLines={1}>{session.name}</Text>
          <Text style={{fontWeight: '400', fontSize: 12, color: '#777'}} numberOfLines={1}>{session.email || session.username}</Text>
        </View>
      </View>
      <View style={styles.body}>
        {role === 'STUDENT' ? <DrawerStudent {...props} /> : <DrawerManager {...props} />}
      </View>
      <View style={styles.footer}>
        <Button style={styles.signOutButton} title={translate('Sign out')} onPress={() => signOut()} />
        <Text style={styles.versionLabel}>{translate('Version')} {version}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  header: {
    marginTop: Platform.select({ ios: 70, android: 30 }),
    marginBottom: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  body: {
    flexGrow: 1
  },
  footer: {
    marginBottom: Platform.select({ ios: 25, android: 10 }),
    paddingHorizontal: 10,
    backgroundColor: '#eee'
  },
  signOutButton: {
    marginTop: 10,
  },
  versionLabel: {
    textAlign: 'center',
    paddingTop: 5,
    fontSize: 10,
    color: '#777'
  }
});
