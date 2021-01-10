import React from 'react';
import { Avatar } from 'react-native-elements';
import {
  View, Text, StyleSheet, Dimensions,
} from 'react-native';
import ButtonBasic from '../ButtonBasic/ButtonBasic';

const { height, width } = Dimensions.get('screen');
const requirePhoto = require('../../../assets/busyPosition.png');

const FollowAvatar = ({
  follow = true,
  urlImage,
  size = height * 0.1,
  name,
  date,
  accessory = null,
  showAccessory = false,
  onPress,
  pressFollow,
  pressUnfollow,
}) => {
  const imgUser = urlImage
    ? { uri: urlImage }
    : requirePhoto;
  const buttonPress = async (value) => {
    if (value) {
      if (pressFollow) await pressFollow();
    }
    if (!value) {
      if (pressUnfollow) await pressUnfollow();
    }
  };

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
        {date && <Text style={styles.date(size)}>{date}</Text>}
      </View>
      <View style={styles.containerButton(size)}>
        <ButtonBasic
          text={follow ? 'Seguir' : 'Siguiendo'}
          buttonStyle={styles.buttonStyle(size, follow)}
          textStyle={styles.textButtons(size, follow)}
          onPress={() => buttonPress(follow)}
        />
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
    width: flag ? size / 1.15 : size / 1.22,
    borderRadius: 4,
    backgroundColor: flag ? '#F0F0F0' : '#f22',
    borderWidth: 0.3,
    borderColor: flag ? 'gray' : '#f22',
    shadowColor: 'rgba(0,0,0, .4)',
    shadowOffset: { height: 2, width: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 1.5,
    elevation: 2,

  }),
  textButtons: (size, flag) => ({
    color: flag ? 'black' : 'white',
    fontSize: size / 9,
    fontWeight: 'bold',
  }),
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
    marginRight: size / 4,
    width: size * 2.1,
  }),
  containerButton: (size) => ({
    marginTop: size / 4,
    width: size / 1.65,
    alignItems: 'center',
    marginRight: size / 4,
  }),

});

export default FollowAvatar;
