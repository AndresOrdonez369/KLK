import React, { PureComponent } from 'react';
import {
  Dimensions, StyleSheet, View, Text,
} from 'react-native';
import { SearchBar } from 'react-native-elements';

const { height, width } = Dimensions.get('screen');

class Radio extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <SearchBar
          round
          searchIcon={{ size: 24 }}
          placeholder="Type Here..."
        />
        <Text style={styles.title}>
          Radio Start
        </Text>
      </View>
    );
  }
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
