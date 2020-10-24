import React from 'react';
import { Dimensions, StyleSheet, View, Text, FlatList } from 'react-native';
import { Button } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import SimpleAvatar from '../../components/Avatar/SimpleAvatar';
import Post from '../../components/FeedPost';


const { height, width } = Dimensions.get('screen');
const DATA = [
    {
        id: 1,
        authorName: "lizt",
        mensaje: 'Yo vere que escribo',
        mediaLink: "https://firebasestorage.googleapis.com/v0/b/klk-messenger.appspot.com/o/posts%2Faudios%2F2%2FAnd%20It%20Was%20So.mp3?alt=media&token=a7301cb3-1bab-4ed6-883d-e18b8421bd31",
        type: "audio",
        timestamp: "24/10/2020"
    },
    {
        id: 2,
        authorName: "El de la oreja mocha",
        mensaje: 'Yo vere que escribo',
        mediaLink: 'https://media1.tenor.com/images/2f5349a8ca4737441a87465ff9fab2d0/tenor.gif?itemid=12763949',
        type: "image",
        timestamp: "24/10/2020"
    },
    {
        id: 3,
        authorName: "El sangrentino",
        mensaje: 'Yo vere que escribo',
        mediaLink: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        type: "video",
        timestamp: "24/10/2020"
    }];
const Feed = () => {
    //redux
    const profile = useSelector(state => state.reducerProfile)
    const { imageURL } = profile;

    const { navigate } = useNavigation();

    const renderPost = ({ item }) => (
        <Post
            authorName={item.authorName}
            mensaje={item.mensaje}
            mediaLink={item.mediaLink}
            type={item.type}
            timestamp={item.timestamp}
        />
    );

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
                <View style={styles.feedContainer}>
                    <FlatList
                        data={DATA}
                        renderItem={renderPost}
                        keyExtractor={item => item.id}
                    />
                </View>
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
        height: height * 0.1,
        width,
        flexDirection: 'row',
        padding: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 15,
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 2, width: 2 },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 4,
    },
    buttonCreate: {
        width: width * 0.68,
        backgroundColor: '#f22',
        borderRadius: 20
    },
    feedContainer: {

        height: height * 0.8
    }
});

export default Feed;