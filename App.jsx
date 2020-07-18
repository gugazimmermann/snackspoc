import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppearanceProvider } from 'react-native-appearance';
import MainNav from './src/navigation/MainNav';
import UserProvider from './src/context/UserContext';
import StoresProvider from './src/context/StoreContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <AppearanceProvider>
        <UserProvider>
          <StoresProvider>
            <MainNav />
          </StoresProvider>
        </UserProvider>
      </AppearanceProvider>
    </SafeAreaProvider>
  );
}
