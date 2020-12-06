import React, { useState, useEffect } from 'react';
import {
  Dimensions, StyleSheet, View, FlatList, Modal, Text, Image,
} from 'react-native';
import { Button } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import TimedSlideshow from 'react-native-timed-slideshow';
import {
  getStories, handleModalFeed, getPosts, getHidenPosts,
} from './actionCreator';
import AudioComponent from '../../components/Audio';
import SimpleAvatar from '../../components/Avatar/SimpleAvatar';
import BasicModal from '../../components/BasicModal';
import Post from '../../components/FeedPost';
import Bubbles from '../../components/Stories/bubbles';

const { height, width } = Dimensions.get('screen');
const klkmsn = require('../../../assets/klklogo512.png');

const DATA = [
  {
    pid: 'k7tzQyjNtfnSKBrNJBeE',
    urlAvatar: 'https://i.pinimg.com/564x/f1/40/4c/f1404c87f540b80b5fcf766e4c1f567d.jpg',
    authorName: 'Valentina Ruiz Carmona',
    mensaje: 'La música es lo mejor de mi vida',
    mediaLink: 'https://firebasestorage.googleapis.com/v0/b/klk-messenger.appspot.com/o/posts%2Faudios%2F2%2FAnd%20It%20Was%20So.mp3?alt=media&token=a7301cb3-1bab-4ed6-883d-e18b8421bd31',
    type: 'audio',
    timestamp: '24/10/2020',
    likes: 20,
    authorId: '1VK5QYny97VrexbCWMCKXtuocKa2',
  },
  {
    pid: 'qmx6YCHCdFo0DVPLv4Yi',
    urlAvatar: 'https://www.eltiempo.com/files/article_multimedia/uploads/2019/11/07/5dc434e900e5f.jpeg',
    authorName: 'Sara Sofia Zarama Cifuentes',
    mensaje: 'Eres lo mejor que me ha pasado en la vida @danielFernandez',
    mediaLink: 'https://firebasestorage.googleapis.com/v0/b/klk-messenger.appspot.com/o/posts%2Faudios%2F1VK5QYny97VrexbCWMCKXtuocKa2%2FAUD-20201118-WA0021.mp3?alt=media&token=39b916fd-3174-487d-a3ec-ae04821f19c0',
    type: 'audio',
    timestamp: '24/10/2020',
    likes: 20,
    authorId: '1VK5QYny97VrexbCWMCKXtuocKa2',
  },
];
const Feed = () => {
  // state
  const [showStories, setShowStories] = useState(false);
  const [storiesObj, setStoriesObj] = useState(null);
  // redux
  const dispatch = useDispatch();
  const [realData, setRealData] = useState([]);
  const profile = useSelector((state) => state.reducerProfile);
  const feed = useSelector((state) => state.reducerHome);
  const {
    stories, showModal, modalType, titleModal, heightModal, postList, hidenList,
  } = feed;
  const { imageURL } = profile;

  const { navigate } = useNavigation();

  const renderData = () => {
    const res = postList.filter((post) => !hidenList.includes(post.pid));
    setRealData(res);
  };

  useEffect(() => {
    dispatch(getStories(profile.uid));
    dispatch(getPosts(profile.uid));
    dispatch(getHidenPosts(profile.uid));
  }, [profile.uid]);
  useEffect(() => {
    if (postList.length > 0 && hidenList.length > 0) renderData();
  }, [postList, hidenList]);

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
      pid={item.pid}
      url={item.urlAvatar}
      authorName={item.authorName}
      mensaje={item.mensaje}
      mediaLink={item.mediaLink}
      type={item.type}
      likes={item.likes}
      authorId={item.authorId}
      timestamp={item.timestamp}
      navigate={navigate}
      screen="Inicio"
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
    if (data.length > 0) setShowStories(true);
    if (data.length < 1) dispatch(handleModalFeed(true, 'error', 'No tienes ninguna historia activa'));
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
        <View style={styles.radioContainerStyle}>
          <View style={styles.radioButtonContainer}>
            <AudioComponent
              id="radio1"
              link="http://64.37.50.226:8006/stream"
              radio
              size={25}
            />
          </View>
          <Image source={klkmsn} style={{ marginLeft: 50, height: 45, width: 45 }} />
          <Text style={styles.title}>
            klk msn
          </Text>

        </View>

        {showModal
        && (
          <BasicModal
            type={modalType}
            visible={showModal}
            title={titleModal}
            onPressCancel={() => dispatch(handleModalFeed(false))}
            onPressOk={null}
            requiredHeight={heightModal}
          />
        )}
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
            contentContainerStyle={{ marginBottom: 100 }}
            data={realData}
            renderItem={renderPost}
            keyExtractor={(item) => item.pid}
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
    textAlign: 'center',
    marginLeft: 20,
    fontWeight: '700',
    color: '#0667FF',
  },
  radioButtonContainer: {
    height: height * 0.6,

  },
  radioContainerStyle: {
    height: height * 0.07,
    width,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    paddingLeft: 20,
    marginBottom: -5,
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
    height: height * 0.6,
  },
});

export default Feed;
