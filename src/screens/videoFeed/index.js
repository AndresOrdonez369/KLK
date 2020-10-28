import React, { PureComponent } from 'react';
import {
  Dimensions, StyleSheet, View, FlatList, StatusBar,
} from 'react-native';
import Post from '../../components/FeedPost';

const { height, width } = Dimensions.get('screen');

const DATA = [
  {
    id: 1,
    urlAvatar: 'https://scontent.fclo8-1.fna.fbcdn.net/v/t1.0-9/p960x960/121431595_1456426234550986_3155378973963836072_o.jpg?_nc_cat=108&ccb=2&_nc_sid=9e2e56&_nc_ohc=N95eJLwt4vAAX8HBUjt&_nc_ht=scontent.fclo8-1.fna&tp=6&oh=3351b72d4a771f217ea832c4c5bfedb8&oe=5FBA3C76',
    authorName: 'klk radio',
    mensaje: 'Y esta es la canción de la semana, tan latina como tú',
    mediaLink: 'https://firebasestorage.googleapis.com/v0/b/klk-messenger.appspot.com/o/posts%2Faudios%2F2%2FAnd%20It%20Was%20So.mp3?alt=media&token=a7301cb3-1bab-4ed6-883d-e18b8421bd31',
    type: 'audio',
    timestamp: '24/10/2020',
  },
  {
    id: 2,
    urlAvatar: 'https://scontent.fclo8-1.fna.fbcdn.net/v/t1.0-9/p960x960/121431595_1456426234550986_3155378973963836072_o.jpg?_nc_cat=108&ccb=2&_nc_sid=9e2e56&_nc_ohc=N95eJLwt4vAAX8HBUjt&_nc_ht=scontent.fclo8-1.fna&tp=6&oh=3351b72d4a771f217ea832c4c5bfedb8&oe=5FBA3C76',
    authorName: 'klk radio',
    mensaje: 'Cada vez traemos más novedades, klk la aplicación para ti, tan latina como tú.',
    mediaLink: 'https://firebasestorage.googleapis.com/v0/b/klk-messenger.appspot.com/o/posts%2Faudios%2F2%2FAnd%20It%20Was%20So.mp3?alt=media&token=a7301cb3-1bab-4ed6-883d-e18b8421bd31',
    type: 'audio',
    timestamp: '24/10/2020',
  },
  {
    urlAvatar: 'https://www.spanishjournal.com/wp-content/uploads/2019/09/091919entertainment.jpg',
    id: 3,
    authorName: 'Austin Agustin Santos',
    mensaje: 'Aquí la primera canción de mi nuevo album.',
    mediaLink: 'https://firebasestorage.googleapis.com/v0/b/klk-messenger.appspot.com/o/posts%2Faudios%2F2%2FAnd%20It%20Was%20So.mp3?alt=media&token=a7301cb3-1bab-4ed6-883d-e18b8421bd31',
    type: 'audio',
    timestamp: '24/10/2020',
  }];

const styles = StyleSheet.create({
  container: {
    height: height * 0.9,
    width,
    marginTop: StatusBar.currentHeight || 0,
  },
  title: {
    fontSize: 24,
  },
});
const VideoFeed = () => {
  const { container, title } = styles;

  const renderPost = ({ item }) => (
    <Post
      url={item.urlAvatar}
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
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
export default VideoFeed;
