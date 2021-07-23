import React, { useState } from 'react';
import { Image } from 'react-native';
import { useNavigation, useRoute, useTheme } from '@react-navigation/native';


export default function UserAvatar({ hash, username, style, size = 40 }) {

  const { system } = useTheme();
  let uri = hash ? `https://apps.gennera.com.br/public/users/${hash}/photo` : `https://apps.gennera.com.br/public/users/photo?username=${username}`;

  let defaultStyle = {
    width: Platform.select({ ios: size, android: size }),
    height: Platform.select({ ios: size, android: size }),
    borderRadius: 75,
    backgroundColor: system.colors.blue,
    ...style
  }

  return (
    <Image style={defaultStyle} source={{ uri }} />
  );
}
