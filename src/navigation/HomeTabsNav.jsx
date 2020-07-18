import React, { useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useTheme, Colors } from 'react-native-paper';
import { FontAwesome5 as FA5 } from '@expo/vector-icons';
import Balance from '../screens/Balance';
import Promotions from '../screens/Promotions';
import Stores from '../screens/Stores';
import Social from '../screens/Social';

const { Navigator, Screen } = createMaterialTopTabNavigator();

export default function HomeTabsNav({ navigation }) {
  const theme = useTheme();
  let banner = Math.floor(Math.random() * Math.floor(8));

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', () => {
      banner = Math.floor(Math.random() * Math.floor(8));
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <Navigator
      initialRouteName='Balance'
      tabBarPosition='bottom'
      lazy
      tabBarOptions={{
        activeTintColor: Colors.white,
        inactiveTintColor: Colors.teal100,
        showIcon: true,
        showLabel: false,
        style: {
          backgroundColor: theme.colors.primary,
        },
        indicatorStyle: {
          top: 0,
          backgroundColor: theme.colors.accent,
        },
      }}
    >
      <Screen
        name='Balance'
        options={{
          tabBarLabel: 'Balance',
          tabBarIcon: ({ color }) => (
            <FA5 name='list-ol' size={22} color={color} />
          ),
        }}
      >
        {(props) => <Balance {...props} banner={banner} />}
      </Screen>
      <Screen
        name='Promotions'
        component={Promotions}
        options={{
          tabBarLabel: 'Promotions',
          tabBarIcon: ({ color }) => (
            <FA5 name='shopping-bag' size={22} color={color} />
          ),
        }}
      />
      <Screen
        name='Stores'
        component={Stores}
        options={{
          tabBarLabel: 'Stores',
          tabBarIcon: ({ color }) => (
            <FA5 name='store-alt' size={22} color={color} />
          ),
        }}
      />
      <Screen
        name='Social'
        component={Social}
        options={{
          tabBarLabel: 'Social',
          tabBarIcon: ({ color }) => (
            <FA5 name='hands-helping' size={22} color={color} />
          ),
        }}
      />
    </Navigator>
  );
}
