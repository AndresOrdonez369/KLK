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
  playButtonStyle: {
    height: height * 0.25,
    width: width * 0.95,
    backgroundColor: '#0667FF',
  },
  mediaContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mediaButtonStyle: {
    width: width * 0.46,
    height: height * 0.25,
    backgroundColor: '#0667FF',
  },
});

export default styles;
