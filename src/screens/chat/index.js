import React, { useState } from 'react';
import {
  Dimensions, StyleSheet, View, Text, Platform, KeyboardAvoidingView, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { GiftedChat } from 'react-native-gifted-chat';

const { height, width } = Dimensions.get('screen');

const Chat = () => {
  // state
  const [actualMessage, setActualMessage] = useState('');

  // redux
  const dispatch = useDispatch();
  const chatState = useSelector((state) => state.reducerChat);
  console.log(chatState);

  const { navigate } = useNavigation();

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
        <View style={styles.chatContainer}>
          <GiftedChat
            messages={messages}
            onSend={() => console.log(actualMessage)}
            user={{
              _id: 1,
            }}
            onInputTextChanged={(text) => setActualMessage(text)}
          />
          {
            Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />
          }
        </View>
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
});

export default Chat;
