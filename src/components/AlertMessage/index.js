import React from 'react';
import {
  View, Text, StyleSheet, Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: width * 0.95,
    height: height * 0.03,
    backgroundColor: '#FA8D3B',
    borderRadius: 15,
    padding: 2,
  },
  text: {
    color: 'white',
    fontSize: height * 0.015,
    alignSelf: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
});

const AlertMessage = ({ message }) => (
  <View style={styles.container}>
    <Text style={styles.text}>
      {message}
    </Text>
  </View>
);

export default AlertMessage;
