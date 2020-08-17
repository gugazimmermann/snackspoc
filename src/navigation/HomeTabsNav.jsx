import React, { useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useTheme, Colors } from 'react-native-paper';
import { FontAwesome5 as FA5 } from '@expo/vector-icons';
import i18n from '../../i18n';
import Balance from '../screens/Balance';
import Promotions from '../screens/Promotions';
import Stores from '../screens/Stores';
import Social from '../screens/Social';

const { Navigator, Screen } = createMaterialTopTabNavigator();

export default function HomeTabsNav({ navigation }) {
  const theme = useTheme();
  let banner = Math.floor(Math.random() * Math.floor(8)) + 1;

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', () => {
      banner = Math.floor(Math.random() * Math.floor(8)) + 1;
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <Navigator
      initialRouteName={i18n.t('navigation.statement')}
      tabBarPosition='bottom'
      lazy
      tabBarOptions={{
        activeTintColor: theme.colors.tabs.activeTintColor,
        inactiveTintColor: theme.colors.tabs.inactiveTintColor,
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
        name={i18n.t('navigation.statement')}
        options={{
          tabBarLabel: i18n.t('navigation.statement'),
          tabBarIcon: ({ color }) => (
            <FA5 name='list-ol' size={22} color={color} />
          ),
        }}
      >
        {(props) => <Balance {...props} banner={banner} />}
      </Screen>
      <Screen
        name={i18n.t('navigation.promotions')}
        component={Promotions}
        options={{
          tabBarLabel: i18n.t('navigation.promotions'),
          tabBarIcon: ({ color }) => (
            <FA5 name='shopping-bag' size={22} color={color} />
          ),
        }}
      />
      <Screen
        name={i18n.t('navigation.stores')}
        component={Stores}
        options={{
          tabBarLabel: i18n.t('navigation.stores'),
          tabBarIcon: ({ color }) => (
            <FA5 name='store-alt' size={22} color={color} />
          ),
        }}
      />
      <Screen
        name={i18n.t('navigation.social')}
        component={Social}
        options={{
          tabBarLabel: i18n.t('navigation.social'),
          tabBarIcon: ({ color }) => (
            <FA5 name='hands-helping' size={22} color={color} />
          ),
        }}
      />
    </Navigator>
  );
}
