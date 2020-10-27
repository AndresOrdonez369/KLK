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
  updateDescription, hideModalProfile, setDataChange, updateDataUser,
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
    dataChange, modalType, error, message, user, uid,
  } = profile;
  const { description, name, userName } = user;
  console.log(profile);
  const { navigate } = useNavigation();

  useEffect(() => {
    dataUpdate();
  }, [dataChange]);

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
              <Text style={styles.numbersInfo}>20</Text>
              <Text style={styles.category}>seguidores</Text>
            </View>
            <View style={styles.textCategory}>
              <Text style={styles.numbersInfo}>30</Text>
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
          />
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
    marginTop: -90,
    height: 100,
    backgroundColor: 'rgba(255, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  settingsIcon: {
    alignSelf: 'flex-end',
    marginTop: -80,
    marginRight: 5,
  },
  generalInfo: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginTop: 38,
    height: height * 0.4,
    backgroundColor: 'white',
  },
  textInfo: {
    flexDirection: 'row',
    marginTop: height * 0.05,
    justifyContent: 'center',
  },
  numbersInfo: {
    fontSize: 40,
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  userName: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 15,
    marginBottom: 12,
  },
});

const DATA = [
  {
    id: 1,
    urlAvatar: 'https://firebasestorage.googleapis.com/v0/b/klk-messenger.appspot.com/o/Users%2FprofilePhotos%2F1VK5QYny97VrexbCWMCKXtuocKa2.png?alt=media&token=fd6a0a47-7434-40b4-a5d0-e57dec556479',
    authorName: 'Santiago Llorente Rivadeneira',
    mensaje: '',
    mediaLink: 'https://i.pinimg.com/originals/13/5e/a2/135ea2e7f5cd05fb418db8027c3e5f03.jpg',
    type: 'image',
    timestamp: '24/10/2020',
  },
  {
    id: 2,
    urlAvatar: 'https://firebasestorage.googleapis.com/v0/b/klk-messenger.appspot.com/o/Users%2FprofilePhotos%2F1VK5QYny97VrexbCWMCKXtuocKa2.png?alt=media&token=fd6a0a47-7434-40b4-a5d0-e57dec556479',
    authorName: 'Santiago Llorente Rivadeneira',
    mensaje: 'La amistad es algo que no se improvisa.',
    mediaLink: 'https://thumbs.dreamstime.com/b/dos-modelos-relajados-del-var%C3%B3n-de-la-moda-36841614.jpg',
    type: 'image',
    timestamp: '24/10/2020',
  },
  {
    id: 3,
    urlAvatar: 'https://firebasestorage.googleapis.com/v0/b/klk-messenger.appspot.com/o/Users%2FprofilePhotos%2F1VK5QYny97VrexbCWMCKXtuocKa2.png?alt=media&token=fd6a0a47-7434-40b4-a5d0-e57dec556479',
    authorName: 'Santiago Llorente Rivadeneira',
    mensaje: 'República dominicana: el pais de tu sueños.',
    mediaLink: 'https://www.descubra.info/wp-content/uploads/2010/03/republica-dominicana.jpg',
    type: 'image',
    timestamp: '14/10/2020',
  }];

export default Profile;
