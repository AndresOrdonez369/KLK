import React from 'react';
import { Avatar } from 'react-native-elements';

const requirePhoto = require('../../../assets/busyPosition.png');

const SimpleAvatar = ({
  url, size = 150, accessory = null, showAccessory = false, onPress = null
}) => {
  const imgUser = url
    ? { uri: url }
    : requirePhoto;
  return (
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
  );
};
export default SimpleAvatar;
