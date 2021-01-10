import React, { useEffect, useState } from 'react';
import {
  Dimensions, StyleSheet, View, FlatList, StatusBar, SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import getPosts from './actionCreator';
import Post from '../../components/FeedPost';

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    width,
    height: height * 0.9,
    marginTop: StatusBar.currentHeight || 0,
  },
  title: {
    fontSize: 24,
  },
});
const VideoFeed = () => {
  const [realData, setRealData] = useState([]);
  const { container } = styles;
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.reducerHome);
  const profile = useSelector((state) => state.reducerProfile);
  const video = useSelector((state) => state.reducerVideoFeed);
  const { postList, postCreated } = video;
  const { hidenList, realDataAction } = feed;

  const renderData = () => {
    const res = postList.filter((post) => !hidenList.includes(post.pid));
    setRealData(res);
  };

  useEffect(() => {
    if (postList.length > 0 && hidenList.length >= 0) renderData();
  }, [postList, hidenList, realDataAction]);

  useEffect(() => {
    const getData = async () => {
      if (postList.length === 0 && postCreated === false) await dispatch(getPosts(profile.uid));
    };
    getData();
  }, [profile.uid, postList, postCreated]);

  const dataPosts = realData.filter((value, index, self) => {
    if (value !== undefined && index !== undefined && self !== undefined) {
      return self.findIndex((p) => p.pid === value.pid) === index;
    }
    return null;
  });

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
      screen="Videos"
    />
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f22' }}>
      <View style={container}>
        <FlatList
          data={dataPosts}
          renderItem={renderPost}
          keyExtractor={(item) => item.pid}
        />
      </View>
    </SafeAreaView>
  );
};
export default VideoFeed;
