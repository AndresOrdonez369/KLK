/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Video } from 'expo-av';
import Avatar from '../Avatar/SimpleAvatar';
import AudioComponent from '../Audio';

import styles from './styles';

const FeedPost = ({
  authorName, mensaje, mediaLink, likes, type = 'audio', timestamp, url,
}) => {
  const {
    container, headerContainer, basicInfoContainer, dotsContainer,
    bodyContainer, messageContainer, mediaContainer, bottomContainer, iconsContainer,
    dotsButtonStyle, messageStyle,
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
        />
      );
    }
  };

  return (
    <View style={container}>
      <View style={headerContainer}>
        <View style={basicInfoContainer}>
          <Avatar size={100} name={authorName} date={timestamp} url={url} />
        </View>
        <View style={dotsContainer}>
          <Button
            buttonStyle={dotsButtonStyle}
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
              <Icon name="water-pump" type="material-community" color="black" size={25} />
            }
          />
          <Button
            buttonStyle={dotsButtonStyle}
            icon={
              <Icon name="cards-heart" type="material-community" color="red" size={25} />
            }
          />
          <Button
            buttonStyle={dotsButtonStyle}
            icon={
              <Icon name="fire" type="material-community" color="green" size={25} />
            }
          />
        </View>
      </View>
    </View>
  );
};

export default FeedPost;
