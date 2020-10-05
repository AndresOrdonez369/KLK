import React, { PureComponent } from 'react';
import { Dimensions, StyleSheet, View, Text } from 'react-native';
    
const { height, width } = Dimensions.get('screen');
    
class Profile extends PureComponent {
    
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}> 
                    Profile Start
                </Text> 
            </View>
        );
    }
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
    }
});
    
export default Profile;