/* eslint-disable react/react-in-jsx-scope */
import {
  Dimensions, StyleSheet, View, FlatList, Text, TouchableHighlight,
} from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import getChats from './actionCreator';
import ChatAvatar from '../../components/Avatar/ChatAvatar';

const { height, width } = Dimensions.get('screen');

const Chats = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.reducerProfile);
  const chats = useSelector((state) => state.reducerChats);
  const { chatList } = chats;

  const { navigate } = useNavigation();
  useEffect(() => {
    if (chatList.length === 0) {
      dispatch(getChats(profile.uid));
    }
  }, [profile.uid, chatList]);

  const renderChats = ({ item }) => {
    const userObj = { imageUrl: item.urlImage, name: item.name, uid: item.uid };
    return (
      <TouchableHighlight underlayColor="#ffc4c4" onPress={() => navigate('Chat', { userObj, screen: 'Chats', actualScreen: 'NoView' })}>

        <ChatAvatar
          name={item.name}
          message={item.message}
          hour={item.hour}
          urlImage={item.urlImage}
        />
      </TouchableHighlight>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F22' }}>
      <View style={styles.header}>
        <Icon
          name="arrow-left"
          type="font-awesome"
          onPress={() => navigate('Perfil')}
          iconStyle={styles.icon}
        />
        <Text style={styles.titleBack}>
          Mis chats
        </Text>
      </View>
      <View style={styles.container}>
        <View style={styles.feedContainer}>
          <FlatList
            data={chatList}
            renderItem={renderChats}
            keyExtractor={(item) => item.name}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height,
    width,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
  },
  createView: {
    height: height * 0.1,
    width,
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: 'rgba(0,0,0, .4)',
    shadowOffset: { height: 2, width: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 4,
  },
  buttonCreate: {
    width: width * 0.68,
    backgroundColor: '#f22',
    borderRadius: 20,
  },
  feedContainer: {
    height: height * 0.66,
  },
  icon: {
    color: '#f22',
    marginRight: 20,
    marginLeft: 8,
  },
  header: {
    height: height * 0.05,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 1,
  },
  titleBack: {
    fontSize: height * 0.02,
    color: 'black',
  },
});

export default Chats;
