import React, { PureComponent } from 'react';
import {
  Dimensions, StyleSheet, View, Text,
} from 'react-native';
import ProfilePicture from '../../components/Avatar/ProfilePicture';
import SimpleAvatar from '../../components/Avatar/SimpleAvatar';
const { height, width } = Dimensions.get('screen');

const Profile=()=> {
    return (
      <View style={styles.container}>
        <SimpleAvatar name="Daniela Estefania Erazo" date="5 de octubre a las 20:16"/>
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
