import React, { PureComponent } from 'react';
import { Dimensions, StyleSheet, View, Text } from 'react-native';
    
const { height, width } = Dimensions.get('screen');
    
class PassRecovery extends PureComponent {
    
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}> 
                    Password recovery started
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
    
export default PassRecovery;