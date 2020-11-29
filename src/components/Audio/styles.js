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
    borderRadius: 50,
    height: height * 0.12,
    width: width * 0.25,
    backgroundColor: '#0667FF',
  },
  mediaContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  mediaButtonStyle: {
    borderRadius: 50,
    width: width * 0.25,
    height: height * 0.12,
    backgroundColor: '#0667FF',
  },
});

export default styles;
