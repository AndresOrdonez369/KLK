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
  updateDescription, hideModalProfile, setDataChange, updateDataUser, getPosts,
} from './actionCreator';
import Post from '../../components/FeedPost';

const { height, width } = Dimensions.get('screen');

const Profile = () => {
  // state
  const [input, showInput] = useState(false);
  // redux
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.reducerProfile);
  const {
    dataChange, modalType, error, message, user, uid, postList,
  } = profile;
  const {
    description, name, userName, qFollowers, qFollowings,
  } = user;

  const { navigate } = useNavigation();

  useEffect(() => {
    dataUpdate();
  }, [dataChange]);

  useEffect(() => {
    dispatch(getPosts(uid));
  }, [uid]);

  const dataUpdate = () => {
    if (dataChange) {
      return dispatch(updateDataUser(user, uid));
    }
    return null;
  };
  console.log('postList Perfil', postList);
  const inputFnc = (inputActive) => {
    if (inputActive) {
      showInput(false);
      dispatch(setDataChange(true));
    } else {
      showInput(true);
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
      navigate={navigate}
      screen="Perfil"
    />
  );

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
          data={DATA}
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
  },
  userName: {
    alignSelf: 'center',
    color: 'white',
    fontSize: height * 0.015,
    marginBottom: height * 0.014,
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
export default Profile;
