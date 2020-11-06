/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { View, Text, Image } from 'react-native';
import { Icon, Button, } from 'react-native-elements';
import { Video } from 'expo-av';
import Avatar from '../Avatar/SimpleAvatar';
import AudioComponent from '../Audio';
import Youtube from '../Youtube'

import styles from './styles';

const FeedPost = ({
  authorName, mensaje, mediaLink, likes, type = 'audio', timestamp, url, key, id, liked=true,
}) => {
  const {
    container, headerContainer, basicInfoContainer, dotsContainer,
    bodyContainer, messageContainer, mediaContainer, bottomContainer, iconsContainer,
    dotsButtonStyle, messageStyle, likesStyle, likesContainer
  } = styles;
  const renderMedia = (type, mediaLink) => {
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
      var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
      let videoId = mediaLink.match(regExp);
      videoId = videoId.pop();
      return (
       <Youtube id={videoId} />
      );
    }
    if (type === 'text') {
      return null;
    }
  };
  return (
    <View style={container}>
      <View style={headerContainer}>
        <View style={basicInfoContainer}>
          <Avatar size={94} name={authorName} date={timestamp} url={url}/>
        </View>
        <View style={dotsContainer}>
          <Button
            buttonStyle={dotsButtonStyle}
            onPress={() =>console.log('esta es la key', key)}
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
          {renderMedia(type, mediaLink)}
        </View>
      </View>
      <View style={bottomContainer}>
        <View style={iconsContainer}>
          <Button
            buttonStyle={dotsButtonStyle}
            icon={
              <Icon name="radio-tower" type="material-community" color={liked ? "gray" : '#f22'  }size={25} />
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
              <Icon name="share" type="material-community" color= '#f22' size={25} />
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
