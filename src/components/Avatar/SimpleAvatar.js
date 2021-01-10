import React from 'react';
import { Avatar } from 'react-native-elements';
import { View, Text, StyleSheet } from 'react-native';

const requirePhoto = require('../../../assets/busyPosition.png');

const SimpleAvatar = ({
  url, size = 150, name, date, accessory = null, showAccessory = false, onPress,
}) => {
  const imgUser = url
    ? { uri: url }
    : requirePhoto;
  return (
    <View style={{ flexDirection: 'row' }}>
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
        {date && <Text style={styles.date(size)}>{date}</Text>}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  name: (size) => ({
    fontSize: size / 6,
    fontWeight: '500',

  }),
  date: (size) => ({
    fontSize: size / 7,
    color: 'gray',
  }),
  containerText: (size) => ({
    marginTop: size / 4,
  }),

});

export default SimpleAvatar;
