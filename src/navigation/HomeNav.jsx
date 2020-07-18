import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Header from '../components/Header';
import HomeTabsNav from './HomeTabsNav';
import Profile from '../screens/user/Profile';
import Preferences from '../screens/user/Preferences';

const Stack = createStackNavigator();

export default function HomeNavigation() {
  return (
    <Stack.Navigator
      initialRouteName='MainTabs'
      headerMode='screen'
      screenOptions={{
        header: ({ scene, previous, navigation }) => {
          return (
            <Header scene={scene} previous={previous} navigation={navigation} />
          );
        },
      }}
    >
      <Stack.Screen
        name='Balance'
        component={HomeTabsNav}
        options={({ route }) => {
          const routeName = route.state
            ? route.state.routes[route.state.index].name
            : route.name;
          return { headerTitle: routeName };
        }}
      />
      <Stack.Screen
        name='Profile'
        component={Profile}
        options={{ headerTitle: 'Profile' }}
      />
      <Stack.Screen
        name='Preferences'
        component={Preferences}
        options={{ headerTitle: 'Preferences' }}
      />
    </Stack.Navigator>
  );
}
