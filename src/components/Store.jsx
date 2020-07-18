/* eslint-disable react/prop-types */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, Text, Avatar } from 'react-native-paper';

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.orange200,
    padding: 20,
    margin: 10,
  },
});

export default function Store({ store }) {
  const s = store.item;
  console.log(s.logo);
  return (
    <View style={styles.item}>
      <Avatar.Image source={require('../../assets/stores/2.png')} size={50} />
      <Text>{s.name}</Text>
      <Text>{s.dist}m</Text>
    </View>
  );
}
