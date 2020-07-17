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
import { AuthContext } from '../context/AuthContext';

import theme from '../styles/theme';
import { currentUserInfo } from '../api/auth';

import Initializing from '../components/Initializing';
import AuthNav from './AuthNav';
import AppNav from './AppNav';

export default function MainNavigation() {
  const [state, dispatch] = useContext(AuthContext);
  const colorScheme = useColorScheme(false);
  const [themeType, setThemeType] = useState(
    colorScheme === 'dark' ? 'dark' : 'light'
  );
  const [user, setUser] = useState(state.user);

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

  function signIn() {
    const currentUser = currentUserInfo();
    dispatch({ type: 'LOGIN', payload: currentUser });
    setUser(true);
  }

  function signOut() {
    setUser();
    dispatch({ type: 'LOGIN', payload: {} });
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
        {user ? (
          <AppNav toggleTheme={toggleThemeType} signOut={signOut} />
        ) : (
          <AuthNav signIn={signIn} />
        )}
      </NavigationContainer>
    </PaperProvider>
  );
}
