/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import {
  Dimensions, StyleSheet, View, Text, Platform, KeyboardAvoidingView, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import {
  GiftedChat, Send, InputToolbar, Bubble,
} from 'react-native-gifted-chat';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import BasicModal from '../../components/BasicModal';
import { uploadImage, uploadVideo } from '../post/actionCreator';
import { sendMessageDB, getMessages } from './actionCreator';

const { height, width } = Dimensions.get('screen');

const Chat = ({ route }) => {
  // state
  const [actualMessage, setActualMessage] = useState('');
  const [modal, setModal] = useState({
    modalType: '',
    showModal: false,
    modalTitle: '',
    pressOk: null,
    pressCancel: null,
    height: 0.3,
  });
  const [image, setImage] = useState('');
  const [video, setVideo] = useState('');

  // redux
  const dispatch = useDispatch();
  const chatState = useSelector((state) => state.reducerChat);
  const profile = useSelector((state) => state.reducerProfile);

  const { navigate } = useNavigation();
  const { userObj, screen, actualScreen } = route.params;
  const { uid } = userObj;

  useEffect(() => {
    dispatch(getMessages(profile.uid, uid));
  }, []);
  const handleModal = (show, type = 'confirmation', title = '', ok = null, modalHeight = 0.3) => {
    setModal({
      showModal: show,
      modalType: type,
      modalTitle: title,
      pressOk: ok,
      pressCancel: () => handleModal(false),
      height: modalHeight,
    });
  };
  const pickMedia = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      handleModal(true, 'error', 'Necesitamos permisos para acceder a la galería');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      videoMaxDuration: 300,
    });
    if (!result.cancelled) {
      if (result.type === 'image') {
        setVideo('');
        setImage(result);
      } else {
        setVideo(result);
        setImage('');
      }
      handleModal(true,
        'interactive',
        '¿Deseas enviar el archivo seleccionado como mensaje?',
        () => {
          sendMedia();
          setModal({ ...modal, showModal: false });
        });
    } else {
      handleModal(true, 'error', 'Has cancelado la carga del archivo');
    }
  };

  const sendMedia = () => {
    if (image !== '') dispatch(uploadImage(image.uri, profile.uid, 'chats'));
    if (video !== '') dispatch(uploadVideo(video.uri, profile.uid, 'chats'));
  };
  useEffect(() => {
    if (chatState.image !== '' || chatState.video !== '') sendMessage();
  }, [chatState.image, chatState.video]);
  const sendMessage = async () => {
    await dispatch(sendMessageDB(
      actualMessage, chatState.image, chatState.video,
      profile.uid, profile.user.userName, chatState.docID,
    ));
  };

  // data
  const messages = chatState.messages ? chatState.messages.map((item) => ({
    _id: item.createdAt,
    text: item.message,
    createdAt: item.createdAt,
    image: item.image,
    video: item.video,
    user: {
      _id: item.authorID === uid ? 2 : 1,
      name: item.userName,
      avatar: item.authorID === uid ? userObj.imageURL : profile.imageURL,
    },
  })) : [];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f22' }}>
      <View style={styles.container}>
        {modal.showModal && (
        <BasicModal
          visible={modal.showModal}
          type={modal.modalType}
          requiredHeight={modal.height}
          title={modal.modalTitle}
          onPressCancel={modal.pressCancel}
          onPressOk={modal.pressOk}
        />
        )}
        <View style={styles.header}>
          <Icon
            name="arrow-left"
            type="font-awesome"
            onPress={() => navigate(screen, { uid, actualScreen })}
            iconStyle={styles.icon}
          />
          <Text style={styles.title}>{userObj.name}</Text>
        </View>
        <KeyboardAvoidingView
          enabled={Platform.OS === 'android'}
          style={styles.chatContainer}
          behavior="padding"
          keyboardVerticalOffset={height * 0.03}
        >
          <View style={styles.chatContainer}>
            <GiftedChat
              messages={messages}
              onSend={() => sendMessage(actualMessage)}
              placeholder="Escribe un mensaje..."
              alwaysShowSend={actualMessage !== ''}
              renderBubble={(props) => (
                <Bubble
                  {...props}
                  wrapperStyle={{
                    right: {
                      backgroundColor: '#f22',
                    },
                  }}
                />
              )}
              renderSend={(props) => (
                <Send
                  {...props}
                  containerStyle={styles.sendContainer}
                >
                  <Icon size={27} type="ionicons" name="send" color="#f22" />
                </Send>
              )}
              user={{
                _id: 1,
              }}
              renderInputToolbar={(props) => (
                <View style={styles.inputView}>
                  <InputToolbar
                    {...props}
                    containerStyle={styles.inputToolbar}
                  />
                  <Icon
                    name="file-image"
                    type="material-community"
                    size={45}
                    color="#f22"
                    onPress={() => pickMedia()}
                  />
                </View>
              )}
              onInputTextChanged={(text) => setActualMessage(text)}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height,
    width,
    backgroundColor: 'white',
  },
  header: {
    height: height * 0.05,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: height * 0.02,
    color: 'black',
  },
  icon: {
    color: '#f22',
    marginRight: 20,
    marginLeft: 8,
  },
  chatContainer: {
    justifyContent: 'flex-end',
    height: height * 0.95 - StatusBar.currentHeight,
    width,
  },
  sendContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginRight: 15,
  },
  inputView: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'gray',
  },
  inputToolbar: {
    width: width * 0.9,
    marginLeft: width * 0.1,
    borderTopWidth: 0,
  },
});

export default Chat;
