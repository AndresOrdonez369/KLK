import React, { useEffect } from 'react';
import {
  Dimensions, StyleSheet, View, Text, FlatList, ScrollView, ImageBackground,
} from 'react-native';
import {
  Icon, Button,
} from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getExtraProfile } from '../../screens/profile/actionCreator';
import Post from '../FeedPost';
import SimpleAvatar from '../Avatar/SimpleAvatar';

const requireCover = require('../../../assets/defaultCover.png');

const { height, width } = Dimensions.get('screen');

const ExtraProfile = ({ route }) => {
  // redux
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.reducerProfile);
  const {
    description, name, userName, followers, following, coverURL, imageURL,
  } = profile.anotherUser;

  const { navigate } = useNavigation();
  const { uid, actualScreen } = route.params;
  console.log(profile);

  useEffect(() => {
    const getData = async () => {
      dispatch(getExtraProfile(uid));
    };
    getData();
    return () => console.log('addd');
  }, [uid]);

  const totalFollowers = followers ? Object.keys(followers).length : 0;
  const totalFollows = following ? Object.keys(following).length : 0;
  const imgUser = imageURL ? { uri: imageURL } : null;
  const imgCover = coverURL ? { uri: coverURL } : requireCover;

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
              <Text style={styles.numbersInfo}>{totalFollowers}</Text>
              <Text style={styles.category}>seguidores</Text>
            </View>
            <View style={styles.textCategory}>
              <Text style={styles.numbersInfo}>{totalFollows}</Text>
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
              title="Seguir"
              buttonStyle={styles.buttonSubmit}
            />
            <Button
              title="Mensaje"
              buttonStyle={styles.buttonSubmit}
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

export default ExtraProfile;
