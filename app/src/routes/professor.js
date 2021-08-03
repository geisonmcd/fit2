import React from 'react';
import { View, Pressable, Text } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Drawer as DrawerContent } from '../components';
import { Timetables, Timetable, Classes, GenerateClasses, AddUsers } from '../screens/professor';
// import { Modal } from '../components';
import { useAuthContext } from '../contexts/AuthContext';
import { translate } from '../translate';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
MaterialIcons.loadFont();

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function getDefaultScreenOptions() {
  // const { system } = useTheme();
  return {
    backgroundColor: 'white',
    headerStyle: {
      backgroundColor: 'grey',
      elevation: 0,
    },
    headerTintColor: 'black',
    borderColor: 'black',
  };
}

function getDefaultOptions(route) {
  const { system } = useTheme();
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

function TimetablesStack() {
    return (
        <Stack.Navigator initialRouteName="Timetables" screenOptions={getDefaultScreenOptions()}>
            <Stack.Screen name="Timetables" component={Timetables} options={({ route }) => ({
                ...getDefaultOptions({ route }),
                headerLeft: () => <BurgerButton />
            })} />
            <Stack.Screen name="Timetable" component={Timetable} options={({ route }) => ({
                ...getDefaultOptions({ route }),
                headerLeft: () => <BackButton />
            })} />
        </Stack.Navigator>
  );
}

function ClassesStack() {
    return (
        <Stack.Navigator initialRouteName="Classes" screenOptions={getDefaultScreenOptions()}>
            <Stack.Screen name="Classes" component={Classes} options={({ route }) => ({
                ...getDefaultOptions({ route }),
                headerLeft: () => <BurgerButton />
            })} />
        </Stack.Navigator>
  );
}

function GenerateClassesStack() {
    return (
        <Stack.Navigator initialRouteName="GenerateClasses" screenOptions={getDefaultScreenOptions()}>
            <Stack.Screen name="GenerateClasses" component={GenerateClasses} options={({ route }) => ({
                ...getDefaultOptions({ route }),
                headerLeft: () => <BurgerButton />
            })} />
        </Stack.Navigator>
  );
}


function AddUsersStack() {
  return (
      <Stack.Navigator initialRouteName="AddUsers" screenOptions={getDefaultScreenOptions()}>
          <Stack.Screen name="AddUsers" component={AddUsers} options={({ route }) => ({
              ...getDefaultOptions({ route }),
              headerLeft: () => <BurgerButton />
          })} />
      </Stack.Navigator>
);
}

function DrawerMenu() {
  return (
    <Drawer.Navigator initialRouteName="Classes" drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="Timetables" component={TimetablesStack} />
      <Drawer.Screen name="GenerateClasses" component={GenerateClassesStack} />
      <Drawer.Screen name="Classes" component={ClassesStack} />
      <Drawer.Screen name="AddUsers" component={AddUsersStack} />
    </Drawer.Navigator>
  );
}

function RootStack() {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen name="DrawerMenu" component={DrawerMenu} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default RootStack;
