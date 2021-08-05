import React from 'react';
import { View, Text, Image } from 'react-native';
import { translate } from '../../../translate';

export default function SplashScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image source={require('../SplashScreen/1062.jpg')}  style={{ width: 500, height: 850 }}/>
    </View>
  );
}