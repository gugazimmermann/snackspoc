import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface, Divider, Text, Title, Avatar } from 'react-native-paper';
import { uriPath } from '../../utils/keys';

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
  },
  title: {
    width: 64,
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
  },
  content: {
    flex: 1,
    alignSelf: 'flex-start',
  },
  text: {
    justifyContent: 'flex-start',
  },
  logo: {
    width: 56,
    alignItems: 'flex-end',
  },
});

export default function Balance({ item }) {
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
