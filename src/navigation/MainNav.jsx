/* eslint-disable react/style-prop-object */
/* eslint-disable camelcase */
import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import { useColorScheme } from 'react-native-appearance';
import {
  useFonts,
  Ubuntu_300Light,
  Ubuntu_300Light_Italic,
  Ubuntu_400Regular,
  Ubuntu_500Medium,
  Ubuntu_700Bold,
} from '@expo-google-fonts/ubuntu';
import AsyncStorage from '@react-native-community/async-storage';
import { UserContext } from '../context/UserContext';

import theme from '../styles/theme';
import * as api from '../api';

import Initializing from '../components/Initializing';
import AuthNav from './AuthNav';
import AppNav from './AppNav';

export default function MainNavigation() {
  const [state, dispatch] = useContext(UserContext);

  const colorScheme = useColorScheme(false);
  const [themeType, setThemeType] = useState(
    colorScheme === 'dark' ? 'dark' : 'light'
  );

  const setStorageThemeType = async (t) => {
    try {
      await AsyncStorage.setItem('@themeType', t);
    } catch (e) {
      console.error(e);
    }
  };

  const getStorageThemeType = async () => {
    try {
      const value = await AsyncStorage.getItem('@themeType');
      if (value !== null) {
        return value;
      }
    } catch (e) {
      console.error(e);
    }
    return 'light';
  };

  const toggleThemeType = () => {
    const newThemeType = themeType === 'light' ? 'dark' : 'light';
    setThemeType(newThemeType);
    setStorageThemeType(newThemeType);
  };

  const [fontsLoaded] = useFonts({
    Ubuntu_300Light,
    Ubuntu_300Light_Italic,
    Ubuntu_400Regular,
    Ubuntu_500Medium,
    Ubuntu_700Bold,
  });

  const setStorageUser = async (u) => {
    try {
      await AsyncStorage.setItem('@user', JSON.stringify(u));
    } catch (err) {
      console.error(err);
    }
  };

  const getStorageUser = async () => {
    try {
      const user = await AsyncStorage.getItem('@user');
      if (user !== null) {
        return JSON.parse(user);
      }
    } catch (err) {
      console.error(err);
      return null;
    }
    return null;
  };

  function signIn() {
    getStorageUser().then(async (u) => {
      let user = u;
      if (!u) {
        user = await api.getUser();
        setStorageUser(user);
      }
      dispatch({ type: 'SET_USER', payload: user });
    });
  }

  function signOut() {
    dispatch({ type: 'LOGOUT', payload: {} });
  }

  useEffect(() => {
    getStorageThemeType().then((t) => setThemeType(t));
  }, []);

  if (!fontsLoaded) {
    return <Initializing />;
  }

  return (
    <PaperProvider theme={theme(themeType)}>
      <StatusBar
        style='light'
        backgroundColor={theme(themeType).colors.primary}
        translucent={false}
      />
      <NavigationContainer theme={theme(themeType)}>
        {state.user.id ? (
          <AppNav toggleTheme={toggleThemeType} signOut={signOut} />
        ) : (
          <AuthNav signIn={signIn} />
        )}
      </NavigationContainer>
    </PaperProvider>
  );
}
