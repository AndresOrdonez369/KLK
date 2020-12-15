import React, { useState, useEffect } from 'react';
import {
  Dimensions, StyleSheet, View, Text, FlatList, ScrollView,
} from 'react-native';
import {
  Icon, Button,
} from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import InputBasic from '../../components/InputBasic/inputBasic';
import BasicModal from '../../components/BasicModal';
import ProfilePicture from '../../components/Avatar/ProfilePicture';
import {
  updateDescription, hideModalProfile, setDataChange, updateDataUser, getPosts, getNumberPosts,
} from './actionCreator';
import Post from '../../components/FeedPost';
import Loader from '../../components/Loader';

const { height, width } = Dimensions.get('screen');

const Profile = () => {
  // state
  const [input, showInput] = useState(false);
  const [realData, setRealData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // redux
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.reducerHome);
  const profile = useSelector((state) => state.reducerProfile);
  const { hidenList, realDataAction } = feed;
  const {
    dataChange, modalType, error, message, user, uid, postList, lengthPost,
  } = profile;
  const {
    description, name, userName, qFollowers, qFollowing,
  } = user;

  const { navigate } = useNavigation();

  const renderData = () => {
    const res = postList.filter((post) => !hidenList.includes(post.pid));
    setRealData(res);
  };
  useEffect(() => {
    if (postList.length > 0 && hidenList.length >= 0) renderData();
  }, [postList, hidenList, realDataAction]);

  useEffect(() => {
    dataUpdate();
  }, [dataChange]);
  useEffect(() => {
    dispatch(getNumberPosts(uid));
  }, [lengthPost, uid]);

  /* useEffect(() => {
    const getLengthPost = async () => {
      await dispatch(getNumberPosts());
    };
    getLengthPost();
  }, [lengthPost]); */

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      if (postList.length === 0) await dispatch(getPosts(uid));
      setIsLoading(false);
    };
    getData();
  }, [uid, postList]);

  const dataUpdate = () => {
    if (dataChange) {
      return dispatch(updateDataUser(user, uid));
    }
    return null;
  };

  const inputFnc = (inputActive) => {
    if (inputActive) {
      showInput(false);
      dispatch(setDataChange(true));
    } else {
      showInput(true);
    }
  };
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
      screen="Perfil"
    />
  );

  if (isLoading) return <Loader message="Obteniendo datos..." />;

  return (
    <SafeAreaView style={styles.safeArea}>
      {error
        && (
        <BasicModal
          requiredHeight={0.55}
          title={message}
          type={modalType}
          onPressCancel={() => {
            dispatch(hideModalProfile());
          }}
        />
        )}
      <ScrollView style={styles.container}>
        <ProfilePicture type="cover" />
        <View style={styles.avatarView}>
          <ProfilePicture type="picture" />
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.userName}>
            @
            {userName}
          </Text>
        </View>
        <View style={styles.settingsIcon}>
          <Icon
            name="settings"
            type="material-icons"
            size={30}
            color="black"
            onPress={() => navigate('Configuraciones')}
          />
        </View>
        <View style={styles.generalInfo}>
          <View style={styles.textInfo}>
            <View style={styles.textCategory}>
              <Text style={styles.numbersInfo}>{lengthPost}</Text>
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
            {input ? (
              <InputBasic
                placeholder=""
                value={description}
                changeText={(text) => dispatch(updateDescription(text))}
              />
            ) : (
              <Text style={{ flexWrap: 'wrap', marginRight: 10 }}>
                { description || '¡Escribe una descripción para tu perfil!' }
              </Text>
            )}
            <Icon
              name={input ? 'checksquare' : 'edit'}
              size={30}
              color="black"
              type="ant-design"
              onPress={() => inputFnc(input)}
            />
          </View>
          <Button
            title="Mis chats"
            buttonStyle={styles.buttonSubmit}
            onPress={() => navigate('Chats', { actualScreen: 'Perfil' })}
          />
        </View>
        <FlatList
          data={dataPosts}
          renderItem={renderPost}
          keyExtractor={(item) => item.pid}
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
    height: height * 0.9,
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
  },
  settingsIcon: {
    alignSelf: 'flex-end',
    marginTop: height * -0.093,
    marginRight: 5,
  },
  generalInfo: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginTop: height * 0.044,
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
    width: width * 0.6,
    alignSelf: 'center',
    marginTop: height * 0.04,
  },
  name: {
    alignSelf: 'center',
    color: 'white',
    fontSize: height * 0.023,
    fontWeight: 'bold',
    marginTop: height * 0.001,
  },
  userName: {
    alignSelf: 'center',
    color: 'white',
    fontSize: height * 0.015,
    marginBottom: height * 0.022,
  },
});

export default Profile;
