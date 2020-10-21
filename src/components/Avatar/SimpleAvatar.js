import React from 'react';
import { Avatar } from 'react-native-elements';
import {View,Text,StyleSheet} from 'react-native';

const requirePhoto = require('../../../assets/busyPosition.png');

const SimpleAvatar = ({
  url, size = 150, name, date, accessory = null, showAccessory = false, onPress = () => {},
}) => {
  const imgUser = url
    ? { uri: url }
    : requirePhoto;
  return (
    <View style={{flexDirection: "row"}}>
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
      <View style={styles.containerText}>
        {name && <Text style={styles.name}>{name}</Text>}
        {date && <Text style={styles.date}>{date}</Text>}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
    name:{
      fontSize: 25,
      fontWeight:"bold",
      
    },
    date:{
      fontSize:20,
      color:"gray"
    },
    containerText:{
      marginTop:30,
    }
  
  });


export default SimpleAvatar;
