import React, { useEffect, useState } from 'react';
import {
  Dimensions, StyleSheet, View, Text, FlatList, ScrollView, ImageBackground,
} from 'react-native';
import {
  Icon, Button,
} from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getExtraProfile, cleanExtraProfile } from '../profile/actionCreator';
import {
  followFirestore, unfollowFirestore, getFollowersByUid, getFollowingsByUid,
} from '../friends/actionCreator';
import Post from '../../components/FeedPost';
import SimpleAvatar from '../../components/Avatar/SimpleAvatar';

const requireCover = require('../../../assets/defaultCover.png');

const { height, width } = Dimensions.get('screen');

const ExtraProfile = ({ route }) => {
  // state
  const [follow, setFollow] = useState(false);
  // redux
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.reducerProfile);
  const {
    description, name, userName, followers, coverURL, imageURL, qFollowers, qFollowings,
  } = profile.anotherUser;
  const screen = 'AnotherProfile';
  const userObj = profile.anotherUser;

  const { navigate } = useNavigation();
  const { uid, actualScreen } = route.params;

  useEffect(() => {
    const getData = async () => {
      await dispatch(getExtraProfile(uid));
      await dispatch(getFollowersByUid(uid));
      await dispatch(getFollowingsByUid(uid));
    };
    if (uid !== undefined) getData();
  }, [uid]);
  useEffect(() => () => {
    dispatch(cleanExtraProfile());
  }, []);
  useEffect(() => {
    const checkFollow = () => {
      if (Object.keys(followers).find((p) => p === profile.uid) === undefined) {
        setFollow(false);
      } else {
        setFollow(true);
      }
    };
    checkFollow();
  }, [followers]);

  const imgUser = imageURL ? { uri: imageURL } : null;
  const imgCover = coverURL ? { uri: coverURL } : requireCover;

  const followFnc = async () => {
    if (follow) {
      await dispatch(unfollowFirestore(profile.uid, uid));
      setFollow(false);
    } else {
      await dispatch(followFirestore(
        profile.uid, uid, imageURL, name, userName,
      ));
      setFollow(true);
    }
  };
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
      screen="AnotherProfile"
    />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <ImageBackground
          source={imgCover}
          style={styles.cover}
        >
          <Icon
            name="arrow-left"
            size={height * 0.04}
            type="font-awesome"
            onPress={() => navigate(actualScreen)}
            color="white"
            iconStyle={styles.coverIcon}
          />
        </ImageBackground>
        <View style={styles.avatarView}>
          <SimpleAvatar
            url={imgUser}
            size={height * 0.14}
          />
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.userName}>
            @
            {userName}
          </Text>
        </View>
        <View style={styles.generalInfo}>
          <View style={styles.textInfo}>
            <View style={styles.textCategory}>
              <Text style={styles.numbersInfo}>10</Text>
              <Text style={styles.category}>posts</Text>
            </View>
            <View style={styles.textCategory}>
              <Text style={styles.numbersInfo}>{qFollowers}</Text>
              <Text style={styles.category}>seguidores</Text>
            </View>
            <View style={styles.textCategory}>
              <Text style={styles.numbersInfo}>{qFollowings}</Text>
              <Text style={styles.category}>siguiendo</Text>
            </View>
          </View>
          <View style={styles.descriptionView}>
            <Text style={{ flexWrap: 'wrap', marginRight: 10 }}>
              {description || 'No hay descripción'}
            </Text>
          </View>
          <View style={styles.buttonsView}>
            <Button
              title={follow ? 'Siguiendo' : 'Seguir'}
              buttonStyle={styles.buttonSubmit}
              onPress={() => followFnc()}
            />
            <Button
              title="Mensaje"
              buttonStyle={styles.buttonSubmit}
              onPress={() => navigate('Chat', { userObj, screen, actualScreen })}
            />
          </View>
        </View>
        <FlatList
          data={DATA}
          renderItem={renderPost}
          keyExtractor={(item) => item.id}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f22',
  },
  container: {
    height,
    width,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
  },
  avatarView: {
    marginTop: height * -0.105,
    height: 100,
    backgroundColor: 'rgba(255, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: 'center',
  },
  settingsIcon: {
    alignSelf: 'flex-end',
    marginTop: height * -0.093,
    marginRight: 5,
  },
  generalInfo: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginTop: height * -0.012,
    height: height * 0.4,
    backgroundColor: 'white',
  },
  textInfo: {
    flexDirection: 'row',
    marginTop: height * 0.05,
    justifyContent: 'center',
  },
  numbersInfo: {
    fontSize: height * 0.05,
    fontWeight: 'bold',
    marginLeft: width * 0.07,
    marginRight: width * 0.07,
  },
  textCategory: {
    alignItems: 'center',
  },
  descriptionView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.03,
    marginLeft: width * 0.1,
    marginRight: width * 0.1,
    height: height * 0.1,
    width: width * 0.8,
  },
  buttonSubmit: {
    backgroundColor: '#f22',
    borderRadius: 20,
    width: width * 0.3,
    alignSelf: 'center',
    margin: height * 0.02,
  },
  name: {
    alignSelf: 'center',
    color: 'white',
    fontSize: height * 0.023,
    fontWeight: 'bold',
  },
  userName: {
    alignSelf: 'center',
    color: 'white',
    fontSize: height * 0.015,
    marginBottom: height * 0.014,
  },
  cover: {
    width,
    height: width * 0.66,
  },
  coverIcon: {
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginTop: 10,
  },
  buttonsView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

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

export default ExtraProfile;
