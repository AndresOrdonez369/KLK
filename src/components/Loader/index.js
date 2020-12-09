import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Dimensions, StyleSheet, Text, ActivityIndicator, View,
} from 'react-native';

const { height, width } = Dimensions.get('screen');

const Loader = ({ message }) => (
  <SafeAreaView style={styles.safeArea}>
    <View styles={{ height, width, backgroundColor: 'white' }}>
      <ActivityIndicator size="large" color="#f22" />
      <Text style={styles.overlayText}>{message}</Text>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  safeArea: {
    height,
    width,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    color: 'black',
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 25,
    marginTop: 20,
  },
});

export default Loader;
