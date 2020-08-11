import React from 'react';
import { View } from 'react-native';
import { useTheme, Divider, Title } from 'react-native-paper';
import i18n from '../../../i18n';
import getStyles from '../../styles/StatementTotal';

export default function StatementTotal({ total, type }) {
  const theme = useTheme();
  const styles = getStyles(theme);
  const styleType = type === 'in' ? styles.positive : styles.negative;

  return (
    <>
      <Divider />
      <View style={styles.item}>
        <Title style={styles.title}>{i18n.t('statement.total')}: </Title>
        <Title style={[styles.value, styleType]}>{total}</Title>
      </View>
    </>
  );
}
