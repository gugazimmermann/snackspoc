import React from 'react';
import { View, Image } from 'react-native';
import { Colors } from 'react-native-paper';
import { uriPath } from '../utils/keys';

export default function Banner({ banner }) {
  return (
    <View style={{ backgroundColor: Colors.indigoA200 }}>
      <Image
        style={{
          width: '100%',
          height: 160,
        }}
        source={{ uri: `${uriPath}banners/${banner}.png` }}
      />
    </View>
  );
}
