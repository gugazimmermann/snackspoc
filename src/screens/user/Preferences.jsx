import React from 'react';
import { View, Image } from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import i18n from '../../../i18n';
import getStyles from '../../styles/preferences';
import logo from '../../../assets/icon.png';

export default function Preferences() {
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <View>
      <Image style={styles.logo} source={logo} />
      <Text style={styles.title}>{i18n.t('drawer.preferences')}</Text>
    </View>
  );
}
