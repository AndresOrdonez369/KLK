import React from 'react';
import { Dimensions, StyleSheet, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
    Icon, Button
  } from 'react-native-elements';
import { signOut } from './actionCreator';
    
const { height, width } = Dimensions.get('screen');
    
const Settings = () => {
    //redux
    const dispatch = useDispatch();
    return (
        <View style={styles.container}>
            <Text style={styles.title}> 
                Settings Start
            </Text> 
            <Button
                title="Cerrar sesión"
                buttonStyle={styles.buttonSubmit}
                onPress={() => dispatch(signOut())}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height,
        width,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
    },
    buttonSubmit: {
        backgroundColor: '#f22',
        borderRadius: 20,
        width: width * 0.6,
        alignSelf: 'center',
        marginTop: height * 0.04
      },
});
    
export default Settings;