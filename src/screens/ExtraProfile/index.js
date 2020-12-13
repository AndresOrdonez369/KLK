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
import {
  getExtraProfile, cleanExtraProfile, getExtraUserPosts, getNumberExtraProfilePosts,
} from '../profile/actionCreator';
import {
  followFirestore, unfollowFirestore, getFollowersByUid, getFollowingsByUid,
} from '../friends/actionCreator';
import Post from '../../components/FeedPost';
import SimpleAvatar from '../../components/Avatar/SimpleAvatar';
import Loader from '../../components/Loader';

const requireCover = require('../../../assets/defaultCover.png');

const { height, width } = Dimensions.get('screen');

const ExtraProfile = ({ route }) => {
  // state
  const [follow, setFollow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);
  // redux
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.reducerProfile);
  const {
    description, name, userName, followers, coverURL, imageURL,
    qFollowers, qFollowings, lengthExtraProfilePost,
  } = profile.anotherUser;
  const screen = 'AnotherProfile';
  const userObj = profile.anotherUser;

  const { navigate } = useNavigation();
  const { uid, actualScreen } = route.params;

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      if (profile.extraUserPosts.length === 0) await dispatch(getExtraUserPosts(uid));
      setCount((prev) => prev + 1);
    };
    if (uid !== undefined) getData();
  }, [uid, profile.extraUserPosts]);
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      if (qFollowing === 0) await dispatch(getFollowingsByUid(uid, 0, qFollowing));
      setCount((prev) => prev + 1);
    };
    if (uid !== undefined) getData();
  }, [uid, qFollowing]);
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      if (qFollowers === 0) await dispatch(getFollowersByUid(uid, 0, qFollowers));
      setCount((prev) => prev + 1);
    };
    if (uid !== undefined) getData();
  }, [uid, qFollowers]);
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      if (name === '') await dispatch(getExtraProfile(uid, name));
      setCount((prev) => prev + 1);
    };
    if (uid !== undefined) getData();
  }, [uid, name]);
  useEffect(() => {
    if (count >= 4) {
      setIsLoading(false);
    }
  }, [count]);

  useEffect(() => {
    setCount(0);
    return () => {
      dispatch(cleanExtraProfile());
    };
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

  useEffect(() => {
    dispatch(getNumberExtraProfilePosts(uid));
  }, [lengthExtraProfilePost, uid]);

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

  if (isLoading) return <Loader message="Obteniendo datos..." />;

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
              <Text style={styles.numbersInfo}>{lengthExtraProfilePost}</Text>
              <Text style={styles.category}>posts</Text>
            </View>
            <View style={styles.textCategory}>
              <Text style={styles.numbersInfo}>{qFollowers}</Text>
              <Text style={styles.category}>seguidores</Text>
            </View>
            <View style={styles.textCategory}>
              <Text style={styles.numbersInfo}>{qFollowing >= 0 ? qFollowing : 0}</Text>
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
          data={profile.extraUserPosts}
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
    marginBottom: height * 0.020,
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

export default ExtraProfile;
