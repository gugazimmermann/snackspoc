import React from 'react';
import { Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useTheme, Colors } from 'react-native-paper';
import i18n from '../../i18n';
import Banner from '../components/Banner';
import Statement from './Statement';

const Tab = createMaterialTopTabNavigator();

export default function Balance({ banner }) {
  const theme = useTheme();
  return (
    <>
      <Banner banner={banner} />
      <Tab.Navigator
        lazy
        initialRouteName={i18n.t('navigation.gain')}
        initialLayout={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        }}
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
        <Tab.Screen name={i18n.t('navigation.gain')}>
          {() => <Statement type='in' />}
        </Tab.Screen>
        <Tab.Screen name={i18n.t('navigation.used')}>
          {() => <Statement type='out' />}
        </Tab.Screen>
      </Tab.Navigator>
    </>
  );
}
