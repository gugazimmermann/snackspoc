import React from 'react';
import { View, Image } from 'react-native';
import { useTheme, Text } from 'react-native-paper';

import getStyles from '../styles/signIn';
import logo from '../../assets/icon.png';

export default function Social() {
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <View>
      <Image style={styles.logo} source={logo} />
      <Text style={styles.title}>Social!</Text>
    </View>
  );
}
