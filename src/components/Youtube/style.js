import {
  Dimensions, StyleSheet,
} from 'react-native';

const { height, width } = Dimensions.get('screen');
const styles = StyleSheet.create({
  container: {
    height,
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  youtube: {
    height: height * 0.25,
  },
});

export default styles;
