import React from 'react';
import { View } from 'react-native';
import { useTheme, Surface, Text } from 'react-native-paper';
import i18n from '../../../i18n';
import getStyles from '../../styles/NothingToSee';

export default function NothingToSee() {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.view}>
      <Surface style={styles.surface}>
        <Text style={styles.text}>{i18n.t('statement.nothingToSee')}</Text>
      </Surface>
    </View>
  );
}
