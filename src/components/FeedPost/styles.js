import { Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    width,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(0,0,0, .4)',
    shadowOffset: { height: 2, width: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 4,
  },
  title: {
    fontSize: 24,
  },
  headerContainer: {
    height: height * 0.1,
    width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  basicInfoContainer: {
    height: height * 0.06,
    width: width * 0.8,
    margin: 10,
    flexDirection: 'row',
  },
  fechaStyle: {
    color: 'silver',
    fontSize: 10,
  },
  dotsContainer: {
    height: height * 0.05,
    width: width * 0.1,
    margin: 10,
    marginTop: -10,
  },
  dotsButtonStyle: {
    backgroundColor: 'white',
  },
  bodyContainer: {
    width,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  messageContainer: {
    width: width * 0.94,
    marginHorizontal: 10,
  },
  messageStyle: {
    fontSize: 20,
  },
  mediaContainer: {
    height: height * 0.3,
    width: width * 0.95,
    margin: 10,
  },
  mediaButtonStyle: {
    height: height * 0.3,
    width: width * 0.95,
    backgroundColor: '#0667FF',

  },
  bottomContainer: {
    height: height * 0.06,
    width,
    backgroundColor: 'white',
    justifyContent: 'flex-end',
  },
  iconsContainer: {
    height: height * 0.06,
    width: width * 0.2,
    marginLeft: 10,
    flexDirection: 'row',
  },
});

export default styles;
