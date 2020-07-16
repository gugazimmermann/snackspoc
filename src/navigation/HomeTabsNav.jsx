/* eslint-disable react/prop-types */
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useTheme, Colors } from 'react-native-paper';
import { FontAwesome5 as FA5 } from '@expo/vector-icons';
import Statements from '../screens/Statements';
import Promotions from '../screens/Promotions';
import Stores from '../screens/Stores';
import Social from '../screens/Social';

const Tab = createMaterialTopTabNavigator();

export default function HomeTabsNav() {
  const theme = useTheme();
  return (
    <Tab.Navigator
      initialRouteName='Statements'
      tabBarPosition='bottom'
      lazy
      tabBarOptions={{
        activeTintColor: Colors.white,
        inactiveTintColor: Colors.teal100,
        showIcon: true,
        showLabel: false,
        style: {
          backgroundColor: theme.colors.primary,
          shadowColor: Colors.black,
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.13,
          shadowRadius: 5,
          elevation: 3,
        },
        indicatorStyle: {
          top: 0,
          backgroundColor: theme.colors.accent,
        },
      }}
    >
      <Tab.Screen
        name='Statements'
        component={Statements}
        options={{
          tabBarLabel: 'Statements',
          tabBarIcon: ({ color }) => (
            <FA5 name='list-ol' size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='Promotions'
        component={Promotions}
        options={{
          tabBarLabel: 'Promotions',
          tabBarIcon: ({ color }) => (
            <FA5 name='shopping-bag' size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='Stores'
        component={Stores}
        options={{
          tabBarLabel: 'Stores',
          tabBarIcon: ({ color }) => (
            <FA5 name='store-alt' size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='Social'
        component={Social}
        options={{
          tabBarLabel: 'Social',
          tabBarIcon: ({ color }) => (
            <FA5 name='hands-helping' size={22} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
