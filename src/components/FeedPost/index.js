/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { Icon, Button, } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Video } from 'expo-av';
import Avatar from '../Avatar/SimpleAvatar';
import AudioComponent from '../Audio';

import styles from './styles';
const FeedPost = ({
  mensaje, mediaLink, likes, type = 'audio', timestamp,
}) => {
  const {
    container, headerContainer, basicInfoContainer, dotsContainer,
    bodyContainer, messageContainer, mediaContainer, bottomContainer, iconsContainer,
    dotsButtonStyle, messageStyle,
  } = styles;
  const renderMedia =  (type, mediaLink) => {
    if (type === 'image') {
      return (
        <Image
          resizeMode="cover"
          source={{
            uri: 'https://media1.tenor.com/images/2f5349a8ca4737441a87465ff9fab2d0/tenor.gif?itemid=12763949',
          }}
          style={{ flex: 1 }}
        />
      );
    } if (type === 'audio') {
      // hacer await soundObject.unloadAsync(); al component
      return (
      <AudioComponent
       mediaLink="https://firebasestorage.googleapis.com/v0/b/klk-messenger.appspot.com/o/posts%2Faudios%2F2%2FAnd%20It%20Was%20So.mp3?alt=media&token=a7301cb3-1bab-4ed6-883d-e18b8421bd31"
       /> 
      );
    } if (type === 'video') {
      return (
        <Video
          source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={{ flex: 1 }}
        />
      );
    }
  };

  return (
    <View style={container}>
      <View style={headerContainer}>
        <View style={basicInfoContainer}>
          <Avatar size={80} name="JuanMa" date="20/10//20" />
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
          <Text style={messageStyle}>ya quedo chavales!!!</Text>
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
