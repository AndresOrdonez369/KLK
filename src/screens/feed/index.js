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
  getStories, handleModalFeed, getPosts, getHiddenPosts,
} from './actionCreator';
import { idUpdate } from '../../components/Audio/audioAppActionCreator';
import AudioComponent from '../../components/Audio';
import SimpleAvatar from '../../components/Avatar/SimpleAvatar';
import BasicModal from '../../components/BasicModal';
import Post from '../../components/FeedPost';
import Bubbles from '../../components/Stories/bubbles';
import Loader from '../../components/Loader';

const { height, width } = Dimensions.get('screen');
const klkmsn = require('../../../assets/klklogo512.png');

const Feed = () => {
  // state
  const [showStories, setShowStories] = useState(false);
  const [storiesObj, setStoriesObj] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [launchGetPosts, setLaunchGetPosts] = useState(true);
  const [launchGetStories, setLaunchGetStories] = useState(true);
  const [launchGetHidden, setLaunchGetHidden] = useState(true);
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const [realData, setRealData] = useState([]);
  const profile = useSelector((state) => state.reducerProfile);
  const feed = useSelector((state) => state.reducerHome);
  const {
    stories, showModal, modalType, titleModal, heightModal,
    postList, hidenList, realDataAction, postCreated,
  } = feed;
  const { imageURL } = profile;

  const { navigate } = useNavigation();

  const renderData = () => {
    const res = postList.filter((post) => !hidenList.includes(post.pid));
    setRealData(res);
  };

  useEffect(() => setCount(0), []);
  useEffect(() => {
    if (count >= 3) {
      setIsLoading(false);
    }
  }, [count]);
  useEffect(() => {
    const getFeed = async () => {
      if (launchGetHidden) {
        setIsLoading(true);
        await dispatch(getHiddenPosts(profile.uid));
        setLaunchGetHidden(false);
      }
      setCount((prev) => prev + 1);
    };
    getFeed();
  }, [profile.uid]);
  useEffect(() => {
    const getFeed = async () => {
      if (stories.length === 0 && launchGetStories) {
        setIsLoading(true);
        await dispatch(getStories(profile.uid, stories));
        setLaunchGetStories(false);
      }
      setCount((prev) => prev + 1);
    };
    getFeed();
  }, [profile.uid, stories]);
  useEffect(() => {
    const getFeed = async () => {
      if (postList.length === 0 && postCreated === false && launchGetPosts) {
        setIsLoading(true);
        await dispatch(getPosts(profile.uid));
        setLaunchGetPosts(false);
      }
      setCount((prev) => prev + 1);
    };
    getFeed();
  }, [profile.uid, postList, postCreated]);
  useEffect(() => {
    if (postList.length > 0 && hidenList.length >= 0) renderData();
  }, [postList, hidenList, realDataAction]);

  // data
  const uniqueID = stories.filter((value, index, self) => {
    if (value !== undefined && index !== undefined && self !== undefined) {
      return self.findIndex((p) => p.authorID === value.authorID) === index;
    }
    return null;
  });
  const bubbleData = uniqueID.filter((story) => story.authorID !== profile.uid);
  const dataPosts = realData.filter((value, index, self) => {
    if (value !== undefined && index !== undefined && self !== undefined) {
      return self.findIndex((p) => p.pid === value.pid) === index;
    }
    return null;
  });
  console.log(realData, dataPosts);
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

  const onPressStory = async (uid) => {
    await dispatch(idUpdate('nulo'));
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

  if (isLoading) return <Loader message="Cargando..." />;

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
        <View style={styles.feedContainer}>
          <FlatList
            ListHeaderComponent={(
              <View>
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
              </View>
              )}
            contentContainerStyle={{ marginBottom: 100 }}
            data={dataPosts}
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
    height: height * 0.87,
  },
});

export default Feed;
