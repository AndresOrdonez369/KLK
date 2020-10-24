import React, { useState, useEffect } from 'react';
import {
  Dimensions, StyleSheet, View, Text, FlatList, ScrollView
} from 'react-native';
import {
  Icon, Button
} from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import InputBasic from '../../components/InputBasic/inputBasic';
import BasicModal from '../../components/BasicModal';
import ProfilePicture from '../../components/Avatar/ProfilePicture';
import {
  updateDescription, showModalProfile, hideModalProfile, setDataChange, updateDataUser
} from './actionCreator';
import Post from '../../components/FeedPost';

const { height, width } = Dimensions.get('screen');

const Profile = () => {
  //state
  const [input, showInput] = useState(false);
  const [modalData, setModalData] = useState(false);
  //redux
  const dispatch = useDispatch();
  const profile = useSelector(state => state.reducerProfile);
  const { dataChange, modalType, error, message, user, uid } = profile;
  const { description } = user;
  console.log(profile)
  const { navigate } = useNavigation();

  useEffect(() => {
    return () => {
      dataUpdate(dataChange);
    };
  }, [dataChange, user, uid]);

  const dataUpdate = (dataChange) => {
    if (dataChange) {
      return () => {
        dispatch(showModalProfile('Realizaste algunos cambios,\n¿deseas guardarlos?', 'interactive'));
        setModalData(true);
      }
    }
    return null;
  }
  const modalUpdate = async () => {
    await dispatch(updateDataUser(user, uid));
    setModalData(false);
  }
  const inputFnc = (input) => {
    if (input) {
      showInput(false);
      dispatch(setDataChange(true));
    } else {
      showInput(true)
    }
  }
  const renderPost = ({ item }) => (
    <Post
        authorName={item.authorName}
        mensaje={item.mensaje}
        mediaLink={item.mediaLink}
        type={item.type}
        timestamp={item.timestamp}
    />
  );
  return (
    <SafeAreaView style={styles.safeArea}>
      {error &&
        <BasicModal
          requiredHeight={0.55}
          title={message}
          type={modalType}
          onPressCancel={() => {
            dispatch(hideModalProfile());
            if (modalData) dispatch(setDataChange(false));
          }}
          onPressOk={async () => {
            if (modalData) modalUpdate(); 
            dispatch(hideModalProfile());
          }}
        />}
      <ScrollView style={styles.container}>
        <ProfilePicture type="cover" />
        <View style={styles.avatarView}>
          <ProfilePicture type="picture" />
          <Icon />
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
              <Text style={styles.numbersInfo}>{`10`}</Text>
              <Text style={styles.category}>posts</Text>
            </View>
            <View style={styles.textCategory}>
              <Text style={styles.numbersInfo}>{`20`}</Text>
              <Text style={styles.category}>seguidores</Text>
            </View>
            <View style={styles.textCategory}>
              <Text style={styles.numbersInfo}>{`30`}</Text>
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
                { description || `¡Escribe una descripción para tu perfil!` }
              </Text>
            )}
            <Icon
              name={input ? "checksquare" : "edit"}
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
          keyExtractor={item => item.id}
        />
      </ScrollView>
    </SafeAreaView>
  );
  }


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f22'
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
    marginTop: -80,
    height: 90,
    backgroundColor: 'rgba(255, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  settingsIcon: {
    alignSelf: "flex-end",
    marginTop: -80,
    marginRight: 5,
  },
  generalInfo: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginTop: 38,
    height: height * 0.4,
    backgroundColor: 'white'
  },
  textInfo: {
    flexDirection: "row",
    marginTop: height * 0.05,
    justifyContent: "center"
  },
  numbersInfo: {
    fontSize: 40,
    fontWeight: 'bold',
    marginLeft: width * 0.07,
    marginRight: width * 0.07,
  },
  textCategory: {
    alignItems: "center",
  },
  descriptionView: {
    flexDirection: "row",
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
    marginTop: height * 0.04
  },
});

const DATA = [
  {
    id: 1,
    authorName: "lizt",
    mensaje: 'Yo vere que escribo',
    mediaLink: "https://firebasestorage.googleapis.com/v0/b/klk-messenger.appspot.com/o/posts%2Faudios%2F2%2FAnd%20It%20Was%20So.mp3?alt=media&token=a7301cb3-1bab-4ed6-883d-e18b8421bd31",
    type: "audio",
    timestamp: "24/10/2020"
},
{
    id: 2,
    authorName: "El de la oreja mocha",
    mensaje: 'Yo vere que escribo',
    mediaLink: 'https://media1.tenor.com/images/2f5349a8ca4737441a87465ff9fab2d0/tenor.gif?itemid=12763949',
    type: "image",
    timestamp: "24/10/2020"
},
{
    urlAvatar: '',
    id: 3,
    authorName: "El sangrentino",
    mensaje: 'Yo vere que escribo',
    mediaLink:  'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    type: "video",
    timestamp: "24/10/2020"
}];

export default Profile;
