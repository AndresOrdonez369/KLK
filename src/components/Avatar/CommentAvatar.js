import React from 'react';
import { Avatar } from 'react-native-elements';
import {
  View, Text, StyleSheet, Dimensions,
} from 'react-native';

const requirePhoto = require('../../../assets/busyPosition.png');

const { height, width } = Dimensions.get('screen');

const CommentAvatar = ({
  url, size = height * 0.08, name, comment, accessory = null, showAccessory = false, onPress, hour,
}) => {
  const imgUser = url
    ? { uri: url }
    : requirePhoto;
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
      <Avatar
        rounded
        size={size}
        overlayContainerStyle={{ backgroundColor: 'gray', margin: 15 }}
        source={imgUser}
        onPress={onPress}
        accessory={accessory}
        showAccessory={showAccessory}
      />
      <View style={styles.containerText(size)}>
        {name && <Text style={styles.name(size)}>{name}</Text>}
        {comment && <Text style={styles.comment(size)}>{comment}</Text>}
        <View style={styles.containerHour(size)}>
          {hour && <Text style={styles.message(size)}>{hour}</Text>}
        </View>
      </View>

    </View>
  );
};
const styles = StyleSheet.create({
  name: (size) => ({
    fontSize: size / 6,
    fontWeight: '700',
    marginLeft: width * 0.04,
    marginRight: width * 0.04,
    marginBottom: height * 0.01,
    marginTop: height * 0.01,

  }),
  comment: (size) => ({
    fontSize: size / 6.5,
    color: 'black',
    marginLeft: width * 0.04,
    marginRight: width * 0.04,
    marginBottom: height * 0.01,
  }),
  containerText: (size) => ({
    marginTop: size / 4,
    backgroundColor: '#E6E6E6',
    borderRadius: 18,
    width: width * 0.65,
    marginRight: width * 0.08,
  }),
  containerHour: (size) => ({
    marginTop: size / 4,
    width: size / 1.65,
    alignItems: 'space-around',
    marginRight: size / 4,
  }),
  message: (size) => ({
    fontSize: size / 7,
    color: 'black',
  }),
});

export default CommentAvatar;
