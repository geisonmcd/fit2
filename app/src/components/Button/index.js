import React, { useState } from 'react';
import { Text, Pressable, StyleSheet, ActivityIndicator } from 'react-native';

export default function Button({ style, title, textStyle, onPress, requestFeedback }) {
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {

  //   return 
  // }, []);

  async function onPressEvent() {
    if (requestFeedback) {
      setIsLoading(true);
    }
    await onPress();
  }
  
  return (
    <Pressable android_ripple={{color: 'blue'}} style={[styles.button, style]} disabled={requestFeedback && isLoading} onPress={() => onPressEvent()}>
      {isLoading ? (
        <ActivityIndicator size="small" color="#FFF" />
      ) : (
        <Text style={[styles.text, textStyle]}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 4,
    backgroundColor: '#639CBF'
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF'
  }
});
