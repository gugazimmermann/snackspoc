import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useTheme, Colors } from 'react-native-paper';
import { FontAwesome5 as FA5 } from '@expo/vector-icons';

import Banner from '../components/Banner';
import Statement from './Statement';
import Stores from './Stores';

const Tab = createMaterialTopTabNavigator();

export default function Balance({ banner }) {
  const theme = useTheme();
  return (
    <>
      <Banner banner={banner} />
      <Tab.Navigator
        initialRouteName='Balance'
        lazy
        tabBarOptions={{
          activeTintColor: Colors.white,
          inactiveTintColor: Colors.teal100,
          style: {
            backgroundColor: theme.colors.primary,
            shadowColor: Colors.black,
            shadowOpacity: 0.5,
            shadowRadius: 5,
            elevation: 4,
          },
          indicatorStyle: {
            backgroundColor: theme.colors.accent,
          },
        }}
      >
        <Tab.Screen
          name='Statement'
          component={Statement}
          options={{
            tabBarLabel: 'Statement',
          }}
        />
        <Tab.Screen
          name='Used'
          component={Stores}
          options={{
            tabBarLabel: 'Used',
            tabBarIcon: ({ color }) => (
              <FA5 name='store-alt' size={22} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}
