import React from 'react';
import PropTypes from 'prop-types';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeNav from './HomeNav';
import DrawerScreen from '../screens/Drawer';

const Drawer = createDrawerNavigator();

export default function AppNavigation({ toggleTheme, signOut }) {
  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <DrawerScreen {...props} toggleTheme={toggleTheme} signOut={signOut} />
      )}
    >
      <Drawer.Screen name='HomeNav' component={HomeNav} />
    </Drawer.Navigator>
  );
}

AppNavigation.propTypes = {
  toggleTheme: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
};
