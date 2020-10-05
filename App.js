import React, { PureComponent } from 'react';
import { Dimensions, StyleSheet, View, Text } from 'react-native';
import Navigation from './src/navigation/appInitialNavigation';
import { Provider } from 'react-redux';
import { decode, encode } from 'base-64';
  
if (!global.btoa) global.btoa = encode;
if (!global.atob) global.atob = decode;
  

  
const { height, width } = Dimensions.get('screen');
  
class App extends PureComponent {

  render() {
    return (
        <Navigation />
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
  }
});
  
export default App;