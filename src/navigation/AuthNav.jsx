import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import i18n from '../../i18n';
import Header from '../components/Header';
import SignIn from '../screens/auth/SignIn';
import SignUp from '../screens/auth/SignUp';

const { Navigator, Screen } = createStackNavigator();

export default function AuthNav({ signIn }) {
  return (
    <Navigator
      initialRouteName='SignIn'
      screenOptions={{
        header: ({ scene, previous, navigation }) => (
          <Header scene={scene} previous={previous} navigation={navigation} />
        ),
      }}
    >
      <Screen name='SignIn' options={{ headerShown: false }}>
        {(props) => <SignIn {...props} signIn={signIn} />}
      </Screen>
      <Screen
        name='SignUp'
        component={SignUp}
        options={{
          title: i18n.t('navigation.signUp'),
          headerStyle: { marginTop: 0 },
        }}
      />
    </Navigator>
  );
}
