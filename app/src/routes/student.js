import React from 'react';
import { View, Pressable } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Drawer as DrawerContent, Modal } from '../components';
import {
  StudentClasses,
  StudentClass
} from '../screens/student';
// import { Modal } from '../components';
// import { useAuthContext } from '../contexts/AuthContext';
import { translate } from '../translate';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
MaterialIcons.loadFont();

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function getDefaultScreenOptions(system) {
  return {
    backgroundColor: system.background.primary,
    headerStyle: {
      backgroundColor: system.background.primary,
      elevation: 0,
    },
    headerTintColor: system.label.primary,
    borderColor: system.background.primary,
  };
}

function getDefaultOptions(system, route) {
  return {
    title: route.params?.name ? translate(route.params?.name) : '',
    headerStyle: { backgroundColor: system.background.primary, elevation: 0, shadowOffset: { width: 0, height: 0 } },
    headerLeftContainerStyle: { backgroundColor: 'transparent' },
    headerRightContainerStyle: { backgroundColor: 'transparent' }
  };
}

function BurgerButton() {
  const { system } = useTheme();
  const navigation = useNavigation();
  return (
    <MaterialIcons style={{borderWidth: 0, marginLeft: 12}}  name="menu" color={system.label.primary} size={36} onPress={() => navigation.openDrawer()} />
  );
}

function BackButton() {
  const { system } = useTheme();
  const navigation = useNavigation();
  return (
    <MaterialIcons style={{borderWidth: 0, marginLeft: 2}}  name="chevron-left" color={system.label.primary} size={46} onPress={() => navigation.goBack()} />
  );
}

function StudentClassesStack() {
  const { system } = useTheme();
  return (
    <Stack.Navigator initialRouteName="StudentClasses" screenOptions={getDefaultScreenOptions(system)}>
      <Stack.Screen name="StudentClassesStack" component={StudentClasses} options={({ route }) => ({
        ...getDefaultOptions(system, route),
        headerLeft: () => <BurgerButton />,
      })} />     
      <Stack.Screen name="StudentClass" component={StudentClass} options={({ route }) => ({
        ...getDefaultOptions(system, route),
        headerLeft: () => <BurgerButton />,
      })} />     
    </Stack.Navigator>
  );
}

function DrawerMenu() {
  return (
    <Drawer.Navigator initialRouteName="StudenClasses" drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="StudenClasses" component={StudentClassesStack} />
    </Drawer.Navigator>
  );
}

function RootStack() {
  return (
    <Stack.Navigator mode="modal" screenOptions={{ headerShown: false, gestureEnabled: true, cardOverlayEnabled: true, ...TransitionPresets.ModalPresentationIOS, }} >
      <Stack.Screen name="DrawerMenu" component={DrawerMenu} options={{}} />
      {/* <Stack.Screen name="Configurations" component={Configurations} options={{}} /> */}
    </Stack.Navigator>
  );
}

export default RootStack;