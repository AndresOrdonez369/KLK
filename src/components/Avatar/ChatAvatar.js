import React from 'react';
import { Avatar } from 'react-native-elements';
import {
  View, Text, StyleSheet, Dimensions,
} from 'react-native';

const { height, width } = Dimensions.get('screen');
const requirePhoto = require('../../../assets/busyPosition.png');

const ChatAvatar = ({
  urlImage,
  size = height * 0.1,
  name,
  message,
  accessory = null,
  showAccessory = false,
  onPress,
  hour,
}) => {
  const imgUser = urlImage
    ? { uri: urlImage }
    : requirePhoto;

  return (
    <View style={{
      flexDirection: 'row', justifyContent: 'space-evenly', width, marginRight: width * 0.1,
    }}
    >
      <Avatar
        rounded
        size={size}
        overlayContainerStyle={{ backgroundColor: 'gray', margin: 15 }}
        titleStyle={{ color: 'green' }}
        source={imgUser}
        onPress={onPress}
        accessory={accessory}
        showAccessory={showAccessory}
      />
      <View style={styles.containerText(size)}>
        {name && <Text style={styles.name(size)}>{name}</Text>}
        {message && <Text style={styles.message(size)}>{message}</Text>}
      </View>
      <View style={styles.containerHour(size)}>
        {hour && <Text style={styles.message(size)}>{hour}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonStyle: (size, flag) => ({
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: size / 5,
    width: flag ? size / 1.70 : size / 1.20,
    borderRadius: 4,
    backgroundColor: flag ? '#f22' : '#F0F0F0',
    borderWidth: 0.3,
    borderColor: flag ? '#f22' : 'gray',
    shadowColor: 'rgba(0,0,0, .4)',
    shadowOffset: { height: 2, width: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 1.5,
    elevation: 2,

  }),
  textButtons: (size, flag) => ({
    color: flag ? 'white' : 'black',
    fontSize: size / 8.2,
    fontWeight: 'bold',
  }),
  name: (size) => ({
    fontSize: size / 6,
    fontWeight: '500',
  }),
  message: (size) => ({
    fontSize: size / 7,
    color: 'gray',
  }),
  containerText: (size) => ({
    marginTop: size / 4,
    marginRight: size / 4,
    width: size * 2.1,
  }),
  containerHour: (size) => ({
    marginTop: size / 4,
    width: size / 1.65,
    alignItems: 'center',
    marginRight: size / 4,
  }),

});

export default ChatAvatar;
