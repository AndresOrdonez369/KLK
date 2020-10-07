import {
  StyleSheet,
  Dimensions,
} from 'react-native';

const { height, width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  containerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  inputContainerStyle: (error) => ({
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.06,
    width: width * 0.8,
    borderRadius: 20,
    backgroundColor: 'silver', // gainsboro
    borderBottomWidth: error ? 1 : 0,
    borderWidth: error ? 1 : 0,
    borderColor: error ? 'red' : 'white',
  }),
  labelStyle: {
    alignSelf: 'flex-start',
    color: 'white',
    marginBottom: 10,
  },
});
export default styles;
