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
  },
});
export default styles;
