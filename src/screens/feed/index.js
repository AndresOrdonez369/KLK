import React, { useState, useEffect } from 'react';
import {
  Dimensions, StyleSheet, View, FlatList, Modal,
} from 'react-native';
import { Button } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import TimedSlideshow from 'react-native-timed-slideshow';
import { getStories } from './actionCreator';
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
const Feed = () => {
  // state
  const [showStories, setShowStories] = useState(false);
  const [storiesObj, setStoriesObj] = useState(null);
  // redux
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.reducerProfile);
  const feed = useSelector((state) => state.reducerHome);
  const { stories } = feed;
  const { imageURL } = profile;

  const { navigate } = useNavigation();

  useEffect(() => {
    dispatch(getStories());
  }, []);

  // data
  const uniqueID = stories.filter((value, index, self) => {
    if (value !== undefined && index !== undefined && self !== undefined) {
      return self.findIndex((p) => p.authorID === value.authorID) === index;
    }
    return null;
  });
  const bubbleData = uniqueID.filter((story) => story.authorID !== profile.uid);
  // fnc
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
  const onPressStory = (uid) => {
    let story = [];
    if (uid === profile.uid) {
      story = stories.filter((item) => item.authorID === profile.uid);
    } else {
      const index = stories.findIndex((p) => p.authorID === uid);
      story = stories.slice(index);
    }
    const data = story.map((item) => {
      const date = new Date(item.createdAt);
      const padm = date.getMinutes() > 9 ? '' : '0';
      const padh = date.getHours() > 9 ? '' : '0';
      const hour = `${padh}${date.getHours()} : ${padm}${date.getMinutes()}`;
      return {
        uri: item.mediaURL,
        title: item.authorUsername,
        text: hour,
      };
    });
    setStoriesObj(data);
    setShowStories(true);
  };
  if (showStories) {
    if (storiesObj) {
      return (
        <Modal
          visible={showStories}
        >
          <TimedSlideshow
            items={storiesObj}
            onClose={() => setShowStories(false)}
            loop={false}
          />
        </Modal>
      );
    }
    return console.log('no hay stories');
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F22' }}>
      <View style={styles.container}>
        <Bubbles
          stories={bubbleData}
          pressStory={(uid) => onPressStory(uid)}
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
