import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppearanceProvider } from 'react-native-appearance';
import MainNav from './src/navigation/MainNav';
import AuthProvider from './src/context/AuthContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <AppearanceProvider>
        <AuthProvider>
          <MainNav />
        </AuthProvider>
      </AppearanceProvider>
    </SafeAreaProvider>
  );
}
