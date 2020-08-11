import React from 'react';
import { View } from 'react-native';
import { useTheme, Surface, Text, Title, Avatar } from 'react-native-paper';
import i18n from '../../../i18n';
import { uriPath } from '../../utils/keys';
import getStyles from '../../styles/StatementList';

export default function StatementItem({ value }) {
  const theme = useTheme();
  const styles = getStyles(theme);
  const { item } = value;
  const styleType = item.type === 'in' ? styles.positive : styles.negative;
  if (item.type === 'out') styles.text = { ...styles.text, paddingTop: 8 };
  return (
    <Surface style={styles.item}>
      <View style={styles.logo}>
        <Avatar.Image
          size={48}
          source={{ uri: `${uriPath}stores/${item.store.logo}` }}
        />
      </View>
      <View style={styles.content}>
        <Text style={[styles.title]}>{item.store.name}</Text>
        {item.type === 'out' && (
          <Text style={styles.text}>
            {i18n.t('statement.usedOn')} {item.date}
          </Text>
        )}
        {item.type === 'in' && (
          <>
            <Text style={styles.text}>
              {i18n.t('statement.gainedOn')} {item.date}
            </Text>
            <Text style={styles.text}>
              {i18n.t('statement.expireOn')} {item.expirationDate}
            </Text>
          </>
        )}
      </View>
      <Title style={[styles.value, styleType]}>{item.value}</Title>
    </Surface>
  );
}
