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

const { height, width } = Dimensions.get('screen');

const Chat = () => {
  // state
  const [actualMessage, setActualMessage] = useState('');
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);

  // redux
  const dispatch = useDispatch();
  const chatState = useSelector((state) => state.reducerChat);
  console.log(chatState);

  const { navigate } = useNavigation();
  // const { userObj } = route.params;

  const pickMedia = async (type) => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      setModal({
        ...modal,
        showModal: true,
        modalType: 'error',
        modalTitle: 'Necesitamos permisos para acceder a la galería',
        pressCancel: () => setModal({ ...modal, showModal: false }),
      });
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: [ImagePicker.MediaTypeOptions.Videos, ImagePicker.MediaTypeOptions.Images],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      videoMaxDuration: 300,
    });
    if (!result.cancelled) {
      if (type === 'video') setVideo(result); else setImage(result);
      uploadStatus(false);
      if (type === 'video') setUploaded('video'); else setUploaded('image');
    } else {
      uploadStatus(true);
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
        <View style={styles.header}>
          <Icon
            name="arrow-left"
            type="font-awesome"
            onPress={() => navigate('Inicio')}
            iconStyle={styles.icon}
          />
          <Text style={styles.title}>
            Chat con...
          </Text>
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
              alwaysShowSend={actualMessage}
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
