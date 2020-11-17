/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { Icon, Button } from 'react-native-elements';
import { Video } from 'expo-av';
import Avatar from '../Avatar/SimpleAvatar';
import AudioComponent from '../Audio';
import Youtube from '../Youtube';
import firebase from '../../../firebase';

import styles from './styles';

const FeedPost = async ({
  authorName, mensaje, mediaLink, likes, type, timestamp, url, pid, authorId,
}) => {
  const {
    container, headerContainer, basicInfoContainer, dotsContainer,
    bodyContainer, messageContainer, mediaContainer, bottomContainer, iconsContainer,
    dotsButtonStyle, messageStyle, likesStyle, likesContainer,
  } = styles;

  const [like, setLike] = useState(false);
  const profile = useSelector((state) => state.reducerProfile);
  const { uid } = profile;

  const firebaseQuery = firebase.firestore().collection('posts').doc(authorId).collection('userPosts')
    .doc(pid)
    .collection('likes')
    .doc(uid);
  await firebaseQuery.get().then((doc) => {
    console.log('este es el doc', doc);
    if (doc.exists && doc.data().userlike) {
      setLike(true);
    } else {
      setLike(false);
    }
  }).catch((error) => {
    console.log('Error getting document:', error);
  });
  useEffect(() => {
    return () => {
      if (like) firebaseQuery.set({ userlike: like }, { merge: true });
    };
  }, []);
  const renderMedia = () => {
    if (type === 'image') {
      return (
        <Image
          resizeMode="cover"
          source={{
            uri: mediaLink,
          }}
          style={{ flex: 1 }}
        />
      );
    } if (type === 'audio') {
      // hacer await soundObject.unloadAsync(); al component
      return (
        <AudioComponent
          mediaLink={mediaLink}
        />
      );
    } if (type === 'video') {
      return (
        <Video
          source={{ uri: mediaLink }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          style={{ flex: 1 }}
          useNativeControls
        />
      );
    }
    if (type === 'youtube') {
      const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
      let videoId = mediaLink.match(regExp);
      videoId = videoId.pop();
      return (
        <Youtube id={videoId} />
      );
    }
    return null;
  };
  return (
    <View style={container}>
      <View style={headerContainer}>
        <View style={basicInfoContainer}>
          <Avatar size={94} name={authorName} date={timestamp} url={url} />
        </View>
        <View style={dotsContainer}>
          <Button
            buttonStyle={dotsButtonStyle}
            onPress={() => console.log('este es el pid', pid)}
            icon={
              <Icon name="dots-vertical" type="material-community" color="black" size={25} />
            }
          />
        </View>
      </View>
      <View style={bodyContainer}>
        <View style={messageContainer}>
          <Text style={messageStyle}>{mensaje}</Text>
        </View>
        <View style={mediaContainer}>
          {renderMedia()}
        </View>
      </View>
      <View style={bottomContainer}>
        <View style={iconsContainer}>
          <Button
            buttonStyle={dotsButtonStyle}
            onPress={() => (like ? setLike(false) : setLike(true))}
            icon={
              <Icon name={like ? 'heart' : 'heart-outline'} type="material-community" color={like ? '#f22' : 'gray'} size={25} />
            }
          />
          <Button
            buttonStyle={dotsButtonStyle}
            icon={
              <Icon name="comment-multiple" type="material-community" color="gray" size={25} />
            }
          />
          <Button
            buttonStyle={dotsButtonStyle}
            icon={
              <Icon name="share" type="material-community" color="#f22" size={25} />
            }
          />
        </View>
        <View style={likesContainer}>
          <Text style={likesStyle}>{likes}</Text>
        </View>
      </View>
    </View>
  );
};

export default FeedPost;
