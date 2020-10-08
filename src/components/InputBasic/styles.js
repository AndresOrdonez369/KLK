import {
  StyleSheet,
  Dimensions,
} from 'react-native';

const { height, width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  containerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    shadowColor: 'rgba(0,0,0, .4)',
    shadowOffset: { height: 2, width: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 4,
   },
  inputContainerStyle: (error) => ({
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.06,
    width: width * 0.8,
    borderRadius: 8,
    backgroundColor: 'white', // gainsboro
    borderBottomWidth: 1,
    borderWidth: 1,
    borderColor: error ? 'red' : '#2672FF',
    color:"red",
  }),
  labelStyle: {
    alignSelf: 'flex-start',
    color: '#2672FF',
    marginBottom: 10,
    marginLeft:width * 0.08,
    marginRight:width * 0.1,
  },
});
export default styles;
