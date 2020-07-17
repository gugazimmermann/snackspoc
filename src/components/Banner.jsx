/* eslint-disable global-require */
/* eslint-disable react/prop-types */
import React from 'react';
import { View, Image } from 'react-native';
import { Colors } from 'react-native-paper';

const bannerArr = [
  require('../../assets/banners/1.png'),
  require('../../assets/banners/2.png'),
  require('../../assets/banners/1.png'),
  require('../../assets/banners/4.png'),
  require('../../assets/banners/5.png'),
  require('../../assets/banners/6.png'),
  require('../../assets/banners/7.png'),
  require('../../assets/banners/8.png'),
  require('../../assets/banners/9.png'),
];

let banner = bannerArr[0];

export default function Banner({ bannerNum }) {
  banner = bannerArr[bannerNum];
  return (
    <View style={{ backgroundColor: Colors.indigoA200 }}>
      <Image
        style={{
          width: '100%',
          height: 160,
        }}
        source={banner}
      />
    </View>
  );
}
