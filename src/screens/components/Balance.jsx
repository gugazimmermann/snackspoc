import React from 'react';
import { View } from 'react-native';
import { Surface, Divider, Text, Title, Avatar } from 'react-native-paper';
import { uriPath } from '../../utils/keys';
import getStyles from '../../styles/defaultList';

export default function Balance({ item }) {
  const styles = getStyles();
  const balance = item.item;
  return (
    <>
      <Surface style={styles.item}>
        <Title style={styles.title}>{balance.value}</Title>
        <View style={styles.content}>
          <Text style={[styles.text, { fontWeight: 'bold' }]}>
            {balance.store.name}
          </Text>
          <Text style={styles.text}>Gain at {balance.date}</Text>
          <Text style={styles.text}>Expire at {balance.expirationDate}</Text>
        </View>
        <View style={styles.logo}>
          <Avatar.Image
            size={50}
            source={{ uri: `${uriPath}stores/${balance.store.logo}` }}
          />
        </View>
      </Surface>
      <Divider />
    </>
  );
}
