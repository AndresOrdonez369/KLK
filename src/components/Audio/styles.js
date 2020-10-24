import { Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('screen');

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
  mediaButtonStyle: {
    height: height * 0.3,
    width: width * 0.95,
    backgroundColor: '#0667FF',

  },
});

export default styles;
