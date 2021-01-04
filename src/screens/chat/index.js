/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import {
  Dimensions, StyleSheet, View, Text, ScrollView, StatusBar, ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Icon, Overlay } from 'react-native-elements';
import {
  GiftedChat, Send, InputToolbar, Bubble, LoadEarlier,
} from 'react-native-gifted-chat';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import BasicModal from '../../components/BasicModal';
import Loader from '../../components/Loader';
import { uploadImage, uploadVideo } from '../post/actionCreator';
import { sendMessageDB, getMessages, updateLastMessage } from './actionCreator';

const { height, width } = Dimensions.get('screen');

const Chat = ({ route, navigation }) => {
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
  const [isLoading, setIsLoading] = useState(false);
  const [queryIndex, setQueryIndex] = useState(20);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [isLoader, setLoader] = useState(false);

  // redux
  const dispatch = useDispatch();
  const chatState = useSelector((state) => state.reducerChat);
  const profile = useSelector((state) => state.reducerProfile);

  // navigation
  const { navigate } = useNavigation();
  const { userObj, screen, actualScreen } = route.params;
  const { uid } = userObj;

  // fnc
  useEffect(() => {
    const chatInit = async () => {
      setLoader(true);
      setQueryIndex(20);
      setUnsavedChanges(false);
      await dispatch(getMessages(profile.uid, uid, queryIndex));
      setLoader(false);
    };
    chatInit();
  }, []);
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => setLastMessage());
    return unsubscribe;
  }, [navigation, unsavedChanges, messages, chatState, userObj]);
  useEffect(() => {
    if (chatState.error) {
      handleModal(true, 'error', chatState.message);
    }
  }, [chatState.error, chatState.message]);
  const setLastMessage = () => {
    if (unsavedChanges) {
      dispatch(updateLastMessage(chatState.docID, text,
        last.createdAt, userObj.uid, userObj.imageURL, userObj.name));
    }
  };
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
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      videoMaxDuration: 300,
    });
    if (!result.cancelled) {
      handleModal(true,
        'interactive',
        '¿Deseas enviar el archivo seleccionado como mensaje?',
        () => sendMedia(result, result.type));
    } else {
      handleModal(true, 'error', 'Has cancelado la carga del archivo');
    }
  };
  const sendMedia = (media, type) => {
    handleModal(false);
    setIsLoading(true);
    if (type === 'image') {
      dispatch(uploadImage(media.uri, profile.uid, 'chats'));
    } else {
      dispatch(uploadVideo(media.uri, profile.uid, 'chats'));
    }
    setIsLoading(false);
  };
  useEffect(() => {
    if (chatState.image !== '' || chatState.video !== '') sendMessage();
  }, [chatState.image, chatState.video]);
  const sendMessage = async () => {
    setUnsavedChanges(true);
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
      _id: item.userName,
      name: item.userName,
      avatar: item.authorID === uid ? userObj.imageURL : profile.imageURL,
    },
  })) : [];
  const last = messages ? messages[0] : null;
  let text = last ? last.text : '';
  const img = last ? last.image : '';
  const vid = last ? last.video : '';
  if (text === '' && (img !== '' || vid !== '')) {
    text = 'media';
  }

  // loader
  const loader = () => (
    <Overlay isVisible={isLoading} overlayStyle={styles.overlay}>
      <View style={styles.overlayView}>
        <ActivityIndicator size="large" color="#f22" />
        <Text style={styles.overlayText}>...Enviando archivo</Text>
      </View>
    </Overlay>
  );

  if (isLoader) return <Loader message="Cargando mensajes..." />;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f22' }}>
      <ScrollView style={styles.container}>
        {isLoading && loader()}
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
            onPress={() => {
              navigate(screen, { uid, actualScreen });
              setLastMessage();
            }}
            iconStyle={styles.icon}
          />
          <Text style={styles.title}>{userObj.name}</Text>
        </View>
        <View style={styles.chatContainer}>
          <GiftedChat
            messages={messages}
            onSend={() => sendMessage(actualMessage)}
            placeholder="Escribe un mensaje..."
            alwaysShowSend={actualMessage !== ''}
            loadEarlier={queryIndex <= messages.length}
            onLoadEarlier={() => {
              setQueryIndex((prevState) => prevState + 20);
              dispatch(getMessages(profile.uid, uid, queryIndex));
            }}
            renderLoadEarlier={(props) => (
              <LoadEarlier
                {...props}
                label="Cargar mensajes antiguos..."
              />
            )}
            renderBubble={(props) => (
              <Bubble
                {...props}
                wrapperStyle={{
                  right: { backgroundColor: '#f22' },
                  left: { alignContent: 'center' },
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
              _id: profile.user.userName,
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
            onInputTextChanged={(textt) => setActualMessage(textt)}
          />
        </View>
      </ScrollView>
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
    position: 'absolute',
    height: height * 0.1,
    top: height * 0.85,
    bottom: 0,
    left: 0,
    right: 0,
    marginTop: 10,
  },
  inputToolbar: {
    width: width * 0.9,
    marginLeft: width * 0.1,
    borderTopWidth: 0,
    height: (height * 0.1) - 1,
  },
  overlay: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    height,
    width,
  },
  overlayView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 25,
    marginTop: 20,
  },
});

export default Chat;
