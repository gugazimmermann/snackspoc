/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, Text } from 'react-native-paper';

export default function Store({ city }) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{city.item.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: Colors.orange100,
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 24,
  },
});
