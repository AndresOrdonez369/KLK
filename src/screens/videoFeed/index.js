import React, { PureComponent } from 'react';
import { Dimensions, StyleSheet, View, FlatList, StatusBar } from 'react-native';
import Post from '../../components/FeedPost'
    
const { height, width } = Dimensions.get('screen');

const DATA = [
  {
    id: 1,
    authorName: "lizt",
    mensaje: 'Yo vere que escribo',
    mediaLink:  'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    type: "video",
    timestamp: "24/10/2020"
},
{
    id: 2,
    authorName: "El de la oreja mocha",
    mensaje: 'Yo vere que escribo',
    mediaLink:  'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    type: "video",
    timestamp: "24/10/2020"
},
{
    urlAvatar: '',
    id: 3,
    authorName: "El sangrentino",
    mensaje: 'Yo vere que escribo',
    mediaLink:  'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    type: "video",
    timestamp: "24/10/2020"
}];
    
    
const styles = StyleSheet.create({
    container: {
        height: height* 0.9,
        width,
        marginTop: StatusBar.currentHeight || 0,
    },
    title: {
        fontSize: 24,
    }
});
const VideoFeed = () => {
    const { container, title } = styles;

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
    <View style={container}>
         <FlatList 
            data={DATA}
            renderItem={renderPost}
            keyExtractor={item => item.id}
            />
    </View>
  );
};
export default VideoFeed;

