import React from 'react';
import { Surface, Divider, Text, Title, Avatar } from 'react-native-paper';
import { uriPath } from '../../utils/keys';
import getStyles from '../../styles/defaultList';

export default function Store({ store }) {
  const styles = getStyles();
  const s = store.item;
  const dist = s.dist > 1000 ? `${(s.dist / 1000).toFixed(2)}km` : `${s.dist}m`;
  return (
    <>
      <Surface style={styles.item}>
        <Avatar.Image
          size={50}
          source={{ uri: `${uriPath}stores/${s.logo}` }}
        />
        <Text style={[styles.text, { fontWeight: 'bold' }]}>{s.name}</Text>
        <Title style={styles.dist}>{dist}</Title>
      </Surface>
      <Divider />
    </>
  );
}
