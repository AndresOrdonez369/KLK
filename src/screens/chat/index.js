/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
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
  console.log(chatState);

  const { navigate } = useNavigation();
  const { userObj, screen, actualScreen } = route.params;
  const { uid } = userObj;

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
      handleModal(true, 'confirmation', 'Archivo cargado correctamente');
      if (result.type === 'image') {
        setVideo('');
        setImage(result);
      } else {
        setVideo(result);
        setImage('');
      }
    } else {
      handleModal(true, 'error', 'Has cancelado la carga del archivo');
    }
  };

  const messages = [
    {
      _id: 1,
      text: 'Hello developer',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'React Native',
        avatar: 'https://placeimg.com/140/140/any',
      },
    },
    {
      _id: 2,
      text: 'Hello developer',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'React Native',
        avatar: 'https://placeimg.com/140/140/any',
      },
    },
    {
      _id: 3,
      text: 'Hello developer',
      createdAt: new Date(),
      image: 'https://placeimg.com/140/140/any',
      user: {
        _id: 1,
        name: 'React Native',
        avatar: 'https://placeimg.com/140/140/any',
      },
    },
  ];

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
              onSend={() => console.log(actualMessage)}
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
