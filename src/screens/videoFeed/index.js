import React, { useEffect, useState } from 'react';
import {
  Dimensions, StyleSheet, View, FlatList, StatusBar, SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import getPosts from './actionCreator';
import Post from '../../components/FeedPost';

const { width,height} = Dimensions.get('screen');

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
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    width,
    height,
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
  const { postList } = video;
  const { hidenList, realDataAction } = feed;

  const renderData = () => {
    const res = postList.filter((post) => !hidenList.includes(post.pid));
    setRealData(res);
  };
  useEffect(() => {
    if (postList.length > 0 && hidenList.length > 0) renderData();
  }, [postList, hidenList, realDataAction]);

  useEffect(() => {
    const getData = async () => {
      if (postList.length === 0) await dispatch(getPosts(profile.uid));
    };
    getData();
  }, [profile.uid]);
  console.log('video postlist', video.postList);

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
          data={realData}
          renderItem={renderPost}
          keyExtractor={(item) => item.pid}
        />
      </View>
    </SafeAreaView>
  );
};
export default VideoFeed;
