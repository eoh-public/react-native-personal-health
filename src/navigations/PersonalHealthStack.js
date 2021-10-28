import React, { memo } from 'react';
import { Platform } from 'react-native';
import Routes from '../utils/Route';
import { Colors } from '../configs';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import HealthDashboard from '../screens/HealthDashboard/HealthDashboard';
import PersonalHealthDrawer from '../screens/PersonalHealthDrawer';
import HealthConfigDetail from '../screens/HealthConfig/Detail';
import AddEditSchedule from '../screens/AddEditSchedule';
import ManualInput from '../screens/ManualInput/ManualInput';
import AccountSetting from '../screens/AccountSetting';
import Reminder from '../screens/Reminder/Reminder';
import HealthInformation from '../screens/HealthInformation';
import HealthDevices from '../screens/HealthDevices';
import FindHospital from '../screens/FindHospital/FindHospital';

import utils from './utils';

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

const screenOptionsAccountSetting = {
  headerTintColor: '#000',
  headerBackTitle: true,
  headerStyle: {
    elevation: 0,
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
    },
    backgroundColor: Colors.Gray2,
  },
};

const MapDrawer = () => {
  return (
    <Drawer.Navigator
      backBehavior="none"
      drawerContent={(props) => <PersonalHealthDrawer {...props} />}
      drawerType={'front'}
    >
      <Drawer.Screen
        name={Routes.HealthDashboard}
        component={HealthDashboard}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
};

export const PersonalHealthStack = memo(() => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.PersonalHealthMapDrawer}
      screenOptions={{
        ...utils.screenOptions,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: Colors.White,
          elevation: 0,
          borderBottomWidth: Platform.OS === 'android' ? 1 : 0,
          borderColor: Colors.Gray4,
        },
        headerBackTitle: true,
        ...screenOptionsAccountSetting,
      }}
    >
      <Drawer.Screen
        name={Routes.Reminder}
        component={Reminder}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.PersonalHealthMapDrawer}
        component={MapDrawer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.HealthConfigDetail}
        component={HealthConfigDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.ManualInput}
        component={ManualInput}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.AccountSetting}
        component={AccountSetting}
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name={Routes.HealthInformation}
        component={HealthInformation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.HealthDevices}
        component={HealthDevices}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.AddEditSchedule}
        component={AddEditSchedule}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.FindHospital}
        component={FindHospital}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
});
