import React from 'react';
import { View, Pressable, Text } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Drawer as DrawerContent } from '../components';
import {
  Diaries,
  Calendar,
  Timeline,
  Timetables,
  Timetable,
  Diary,
  DiaryContents,
  DiaryCorrections,
  DiaryAttendances,
  DiaryGrades,
  DiaryIncidents,
  DiaryCalendars,
  DiaryFreeAssessments,
  DiaryExams,
  DiaryNotices,
  DiaryAverages,
  DiaryReports,
  DiaryStudents
} from '../screens/professor';
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

function DiariesStack() {
  return (
    <Stack.Navigator initialRouteName="Diaries" screenOptions={getDefaultScreenOptions()}>
      <Stack.Screen name="Diaries" component={Diaries} options={({ route }) => ({
        ...getDefaultOptions({ route }),
        headerLeft: () => <BurgerButton />
      })} />
      <Stack.Screen name="Diary" component={Diary} options={({ route }) => ({
        ...getDefaultOptions({ route }),
        headerLeft: () => <BackButton />
      })} />
      <Stack.Screen name="DiaryContents" component={DiaryContents} options={({ route }) => ({
        ...getDefaultOptions({ route }),
        headerLeft: () => <BackButton />
      })} />
      <Stack.Screen name="DiaryCorrections" component={DiaryCorrections} options={({ route }) => ({
        ...getDefaultOptions({ route }),
        headerLeft: () => <BackButton />
      })} />
      <Stack.Screen name="DiaryAttendances" component={DiaryAttendances} options={({ route }) => ({
        ...getDefaultOptions({ route }),
        headerLeft: () => <BackButton />
      })} />
      <Stack.Screen name="DiaryGrades" component={DiaryGrades} options={({ route }) => ({
        ...getDefaultOptions({ route }),
        headerLeft: () => <BackButton />
      })} />
      <Stack.Screen name="DiaryIncidents" component={DiaryIncidents} options={({ route }) => ({
        ...getDefaultOptions({ route }),
        headerLeft: () => <BackButton />
      })} />
      <Stack.Screen name="DiaryCalendars" component={DiaryCalendars} options={({ route }) => ({
        ...getDefaultOptions({ route }),
        headerLeft: () => <BackButton />
      })} />
      <Stack.Screen name="DiaryFreeAssessments" component={DiaryFreeAssessments} options={({ route }) => ({
        ...getDefaultOptions({ route }),
        headerLeft: () => <BackButton />
      })} />
      <Stack.Screen name="DiaryExams" component={DiaryExams} options={({ route }) => ({
        ...getDefaultOptions({ route }),
        headerLeft: () => <BackButton />
      })} />
      <Stack.Screen name="DiaryNotices" component={DiaryNotices} options={({ route }) => ({
        ...getDefaultOptions({ route }),
        headerLeft: () => <BackButton />
      })} />
      <Stack.Screen name="DiaryAverages" component={DiaryAverages} options={({ route }) => ({
        ...getDefaultOptions({ route }),
        headerLeft: () => <BackButton />
      })} />
      <Stack.Screen name="DiaryReports" component={DiaryReports} options={({ route }) => ({
        ...getDefaultOptions({ route }),
        headerLeft: () => <BackButton />
      })} />
      <Stack.Screen name="DiaryStudents" component={DiaryStudents} options={({ route }) => ({
        ...getDefaultOptions({ route }),
        headerLeft: () => <BackButton />
      })} />
    </Stack.Navigator>
  );
}

function CalendarStack() {
  return (
    <Stack.Navigator initialRouteName="Calendar" screenOptions={getDefaultScreenOptions()}>
      <Stack.Screen name="Calendar" component={Calendar} options={({ route }) => ({
        ...getDefaultOptions({ route }),
        headerLeft: () => <BurgerButton />
      })} />
    </Stack.Navigator>
  );
}

function TimelineStack() {
  return (
    <Stack.Navigator initialRouteName="Timeline" screenOptions={getDefaultScreenOptions()}>
      <Stack.Screen name="Timeline" component={Timeline} options={({ route }) => ({
        ...getDefaultOptions({ route }),
        headerLeft: () => <BurgerButton />
      })} />
    </Stack.Navigator>
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

function DrawerMenu() {
 
  return (
    <Drawer.Navigator initialRouteName="Timetables" drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="Timetables" component={TimetablesStack} />
      <Drawer.Screen name="Diaries" component={DiariesStack} />
      <Drawer.Screen name="Calendar" component={CalendarStack} />
      <Drawer.Screen name="Timeline" component={TimelineStack} />
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
