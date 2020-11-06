import React, { PureComponent } from 'react';
import {
  Dimensions, StyleSheet, View, Text,
} from 'react-native';

const { height, width } = Dimensions.get('screen');

const Radio = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Radio Start
        </Text>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    height,
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
  },
});

export default Radio;
