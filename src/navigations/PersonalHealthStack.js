import React, { memo } from 'react';
import { Platform, StyleSheet } from 'react-native';
import Routes from '../utils/Route';
import { IconOutline } from '@ant-design/icons-react-native';
import { Colors } from '../configs';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import HealthDashboard from '../screens/HealthDashboard';
import PersonalHealthDrawer from '../screens/PersonalHealthDrawer';

import utils from './utils';

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

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
        headerBackImage: () => (
          <IconOutline
            name="left"
            size={27}
            color={Colors.Black}
            style={styles.icLeft}
          />
        ),
        headerStyle: {
          backgroundColor: Colors.White,
          elevation: 0,
          borderBottomWidth: Platform.OS === 'android' ? 1 : 0,
          borderColor: Colors.Gray4,
        },
        headerBackTitle: true,
      }}
    >
      <Stack.Screen
        name={Routes.PersonalHealthMapDrawer}
        component={MapDrawer}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
});

const styles = StyleSheet.create({
  icLeft: {
    marginLeft: Platform.OS === 'ios' ? 8 : 0,
  },
});
