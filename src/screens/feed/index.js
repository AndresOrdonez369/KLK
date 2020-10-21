import React from 'react';
import { Dimensions, StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import SimpleAvatar from '../../components/Avatar/SimpleAvatar';
    
const { height, width } = Dimensions.get('screen');
    
const Feed = () => {
    //redux
    const profile = useSelector(state => state.reducerProfile)
    const { imageURL } = profile;

    const { navigate } = useNavigation();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F82121' }}>
            <View style={styles.container}>
                <View style={styles.createView}>
                    <SimpleAvatar
                        url={imageURL}
                        size={styles.container.height * 0.12}
                    />
                    <Button
                        title="¿klk estás pensando?"
                        onPress={() => navigate('CreatePost')}
                        buttonStyle={styles.buttonCreate}
                    />
                </View>
                <Text style={styles.title}> 
                    Feed inicial
                </Text> 
            </View>
        </SafeAreaView>
    );
}
    
const styles = StyleSheet.create({
    container: {
        height,
        width,
        alignItems: 'center',
        backgroundColor: '#DBDDE2',
    },
    title: {
        fontSize: 24,
    },
    createView: {
        flexDirection: 'row',
        padding: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    buttonCreate: {
        width: width * 0.68,
        backgroundColor: '#f22',
        borderRadius: 20
    }
});
    
export default Feed;