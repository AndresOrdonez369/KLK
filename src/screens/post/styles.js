import { Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('screen');

export default styles = StyleSheet.create({
  container: {
    height,
    width,
    backgroundColor: 'white',
  },
  overlay: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    height,
    width,
  },
  overlayView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: 20,
  },
  title: {
    fontSize: height * 0.02,
    color: 'black',
  },
  header: {
    height: height * 0.05,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 8 + width * 0.05,
    marginLeft: width * 0.05,
  },
  icon: {
    color: '#f22',
    marginRight: 20,
    marginLeft: 8,
  },
  icons: {
    margin: 8,
  },
  input: {
    paddingHorizontal: 0,
    alignItems: 'center',
  },
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: 20,
  },
  iconContainer: {
    flexDirection: 'row',
  },
  inputStyle: {
    justifyContent: 'flex-start',
    height: height * 0.3,
    width: width * 0.9,
    borderRadius: 8,
    backgroundColor: '#E6E6E6', // gainsboro
    borderBottomWidth: 1,
    borderWidth: 0.5,
    borderColor: 'gray',
    shadowColor: 'rgba(0,0,0, .4)',
    shadowOffset: { height: 2, width: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 3,
  },
  placeholder: {
    alignSelf: 'flex-start',
  },
  submitStyle: {
    color: '#f22',
    fontSize: height * 0.023,
  },
  preview: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
