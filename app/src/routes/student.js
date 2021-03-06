import React from 'react';
import { View, Pressable } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Drawer as DrawerContent, Modal } from '../components';
import {
  Calendar,
  Diaries,
  Enrollments,
  EvaluationForms,
  Financial,
  Incidents,
  Timeline,
  Diary,
  DiaryAttendances,
  DiaryContents,
  DiaryFreeAssessments,
  DiaryGrades,
  DiaryReports,
  Configurations
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

function DiariesStack() {
  const { system } = useTheme();
  return (
    <Stack.Navigator initialRouteName="Diaries" screenOptions={getDefaultScreenOptions(system)}>
      <Stack.Screen name="Diaries" component={Diaries} options={({ route }) => ({
        ...getDefaultOptions(system, route),
        headerLeft: () => <BurgerButton />,
      })} />
      <Stack.Screen name="Diary" component={Diary} options={({ route }) => ({
        ...getDefaultOptions(system, route),
        headerLeft: () => <BackButton />,
      })} />
      <Stack.Screen name="DiaryContents" component={DiaryContents} options={({ route }) => ({
        ...getDefaultOptions(system, route),
        headerLeft: () => <BackButton />,
      })} />
      <Stack.Screen name="DiaryAttendances" component={DiaryAttendances} options={({ route }) => ({
        ...getDefaultOptions(system, route),
        headerLeft: () => <BackButton />,
      })} />
      <Stack.Screen name="DiaryGrades" component={DiaryGrades} options={({ route }) => ({
        ...getDefaultOptions(system, route),
        headerLeft: () => <BackButton />,
      })} />
      <Stack.Screen name="DiaryFreeAssessments" component={DiaryFreeAssessments} options={({ route }) => ({
        ...getDefaultOptions(system, route),
        headerLeft: () => <BackButton />,
      })} />
      <Stack.Screen name="DiaryReports" component={DiaryReports} options={({ route }) => ({
        ...getDefaultOptions(system, route),
        headerLeft: () => <BackButton />,
      })} />
    </Stack.Navigator>
  );
}

function CalendarStack() {
  const { system } = useTheme();
  return (
    <Stack.Navigator initialRouteName="Calendar" screenOptions={getDefaultScreenOptions(system)}>
      <Stack.Screen name="Calendar" component={Calendar} options={({ route }) => ({
        ...getDefaultOptions(system, route),
        headerLeft: () => <BurgerButton />
      })} />
    </Stack.Navigator>
  );
}

function TimelineStack() {
  const { system } = useTheme();
  return (
    <Stack.Navigator initialRouteName="Timeline" screenOptions={getDefaultScreenOptions(system)}>
      <Stack.Screen name="Timeline" component={Timeline} options={({ route }) => ({
        ...getDefaultOptions(system, route),
        headerLeft: () => <BurgerButton />
      })} />
    </Stack.Navigator>
  );
}

function IncidentsStack() {
  const { system } = useTheme();
  return (
    <Stack.Navigator initialRouteName="Incidents" screenOptions={getDefaultScreenOptions(system)}>
      <Stack.Screen name="Incidents" component={Incidents} options={({ route }) => ({
        ...getDefaultOptions(system, route),
        headerLeft: () => <BurgerButton />
      })} />
    </Stack.Navigator>
  );
}

function EnrollmentsStack() {
  const { system } = useTheme();
  return (
    <Stack.Navigator initialRouteName="Enrollments" screenOptions={getDefaultScreenOptions(system)}>
      <Stack.Screen name="Enrollments" component={Enrollments} options={({ route }) => ({
        ...getDefaultOptions(system, route),
        headerLeft: () => <BurgerButton />
      })} />
    </Stack.Navigator>
  );
}

function FinancialStack() {
  const { system } = useTheme();
  return (
    <Stack.Navigator initialRouteName="Financial" screenOptions={getDefaultScreenOptions(system)}>
      <Stack.Screen name="Financial" component={Financial} options={({ route }) => ({
        ...getDefaultOptions(system, route),
        headerLeft: () => <BurgerButton />
      })} />
    </Stack.Navigator>
  );
}

function EvaluationFormsStack() {
  const { system } = useTheme();
  return (
    <Stack.Navigator initialRouteName="EvaluationForms" screenOptions={getDefaultScreenOptions(system)}>
      <Stack.Screen name="EvaluationForms" component={EvaluationForms} options={({ route }) => ({
        ...getDefaultOptions(system, route),
        headerLeft: () => <BurgerButton />
      })} />
    </Stack.Navigator>
  );
}

function DrawerMenu() {
  return (
    <Drawer.Navigator initialRouteName="Diaries" drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="Diaries" component={DiariesStack} />
      <Drawer.Screen name="Calendar" component={CalendarStack} />
      <Drawer.Screen name="Timeline" component={TimelineStack} />
      <Drawer.Screen name="Incidents" component={IncidentsStack} />
      <Drawer.Screen name="Enrollments" component={EnrollmentsStack} />
      <Drawer.Screen name="Financial" component={FinancialStack} />
      <Drawer.Screen name="Evaluation Forms" component={EvaluationFormsStack} />
    </Drawer.Navigator>
  );
}

function RootStack() {
  return (
    <Stack.Navigator
      mode="modal"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        cardOverlayEnabled: true,
        ...TransitionPresets.ModalPresentationIOS,
      }}
    >
      <Stack.Screen name="DrawerMenu" component={DrawerMenu} options={{}} />
      {/* <Stack.Screen name="Configurations" component={Configurations} options={{}} /> */}
    </Stack.Navigator>
  );
}

export default RootStack;
