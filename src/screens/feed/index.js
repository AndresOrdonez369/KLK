import React, { useState } from 'react';
import {
  Dimensions, StyleSheet, View, FlatList,
} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import TimedSlideshow from 'react-native-timed-slideshow';
import SimpleAvatar from '../../components/Avatar/SimpleAvatar';
import Post from '../../components/FeedPost';
import Bubbles from '../../components/Stories/bubbles';

const { height, width } = Dimensions.get('screen');
const DATA = [
  {
    id: 1,
    urlAvatar: 'https://i.pinimg.com/564x/f1/40/4c/f1404c87f540b80b5fcf766e4c1f567d.jpg',
    authorName: 'Valentina Ruiz Carmona',
    mensaje: 'La música es lo mejor de mi vida',
    mediaLink: 'https://firebasestorage.googleapis.com/v0/b/klk-messenger.appspot.com/o/posts%2Faudios%2F2%2FAnd%20It%20Was%20So.mp3?alt=media&token=a7301cb3-1bab-4ed6-883d-e18b8421bd31',
    type: 'audio',
    timestamp: '24/10/2020',
  },
  {
    id: 2,
    urlAvatar: 'https://www.eltiempo.com/files/article_multimedia/uploads/2019/11/07/5dc434e900e5f.jpeg',
    authorName: 'Sara Sofia Zarama Cifuentes',
    mensaje: 'Eres lo mejor que me ha pasado en la vida @danielFernandez',
    mediaLink: 'https://media1.tenor.com/images/2f5349a8ca4737441a87465ff9fab2d0/tenor.gif?itemid=12763949',
    type: 'image',
    timestamp: '24/10/2020',
  },
  {
    id: 3,
    urlAvatar: 'https://www.spanishjournal.com/wp-content/uploads/2019/09/091919entertainment.jpg',
    authorName: 'Austin Agustin Santos',
    mensaje: 'Aquí mi nueva canción.',
    mediaLink: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    type: 'video',
    timestamp: '24/10/2020',
  }];
const items = [
  {
    uri: 'http://www.lovethemountains.co.uk/wp-content/uploads/2017/05/New-Outdoor-Sports-and-Music-Festival-For-Wales-4.jpg',
    title: 'Michael Malik',
    text: 'Minnesota, USA',
  },
  {
    uri: 'http://blog.adrenaline-hunter.com/wp-content/uploads/2018/05/bungee-jumping-barcelona-1680x980.jpg',
    title: 'Victor Fallon',
    text: 'Val di Sole, Italy',
    duration: 3000,
  },
  {
    uri: 'https://greatist.com/sites/default/files/Running_Mountain.jpg',
    title: 'Mary Gomes',
    text: 'Alps',
    fullWidth: true,
  },
];
const Feed = () => {
  // state
  const [stories, showStories] = useState(false);
  // redux
  const profile = useSelector((state) => state.reducerProfile);
  const { imageURL } = profile;

  const { navigate } = useNavigation();

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
  if (stories) {
    return (
      <TimedSlideshow
        items={items}
        onClose={() => showStories(false)}
      />
    );
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F82121' }}>
      <View style={styles.container}>
        <Bubbles
          stories={DATA}
          pressStory={() => showStories(true)}
        />
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
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

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
    borderRadius: 20,
  },
  feedContainer: {

    height: height * 0.8,
  },
});

export default Feed;
