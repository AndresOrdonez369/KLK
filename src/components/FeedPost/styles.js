import { Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    paddingBottom: height * 0.01,
    height: height * 0.495,
    width,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(0,0,0, .4)',
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 4,
    marginTop: 20,
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
    height: height * 0.08,
    width: width * 0.8,
    marginTop: -height * 0.02,
    alignItems: 'flex-start',
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
    fontSize: 19,
  },
  mediaContainer: {
    height: height * 0.25,
    width: width * 0.95,
    margin: 10,
    marginBottom: 20,
  },
  mediaButtonStyle: {
    height: height * 0.3,
    width: width * 0.95,
    backgroundColor: '#0667FF',

  },
  bottomContainer: {
    height: height * 0.07,
    width,
    backgroundColor: 'white',
    justifyContent: 'flex-end',
    paddingBottom: height * 0.01,
  },
  iconsContainer: {
    height: height * 0.048,
    width: width * 0.2,
    marginLeft: 10,
    flexDirection: 'row',
  },
  likesContainer: {
    height: height * 0.02,
    width: width * 0.15,
    marginBottom: 10,
  },
  likesStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default styles;
