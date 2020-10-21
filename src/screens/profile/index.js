import React from 'react';
import {
  Dimensions, StyleSheet, View, Text,
} from 'react-native';
import ProfilePicture from '../../components/Avatar/ProfilePicture';
const { height, width } = Dimensions.get('screen');

const Profile=()=> {
    return (
      <View style={styles.container}>
        <ProfilePicture />
      </View>
    );
  }


const styles = StyleSheet.create({
  container: {
    height,
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
  },
});

export default Profile;
