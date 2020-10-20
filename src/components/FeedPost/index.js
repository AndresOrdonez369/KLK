/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Icon, Button, Avatar } from 'react-native-elements';
import { Audio, Video } from 'expo-av';

import styles from './styles';

const FeedPost = ({
  mensaje, mediaLink, likes, type = 'image', timestamp,
}) => {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.reducerLogin);
  const { error } = state;
  const [flags, setFlag] = useState({
    audioActive: false,
  });
  const { audioActive } = flags;
  const {
    container, title, headerContainer, basicInfoContainer, dotsContainer,
    bodyContainer, messageContainer, mediaContainer, bottomContainer, iconsContainer,
    dotsButtonStyle, messageStyle, fechaStyle, mediaButtonStyle,
  } = styles;
  const renderMedia = (type, mediaLink) => {
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
      if (audioActive) {
        return (
          <Button
            onPress={() => setFlag({ ...flags, audioActive: false })}
            buttonStyle={mediaButtonStyle}
            icon={
              <Icon name="pause" type="material-community" color="black" size={150} />
        }
          />
        );
      }
      return (
        <Button
          raised
          onPress={() => setFlag({ ...flags, audioActive: true })}
          buttonStyle={mediaButtonStyle}
          icon={
            <Icon name="play" type="material-community" color="black" size={150} />
        }
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
          <Avatar source={{
            uri:
         'https://img.lovepik.com/element/40126/9767.png_860.png',
          }}
          />
          <View style={{ flexDirection: 'column' }}>
            <Text style={messageStyle}>
              byJuanMaO®
            </Text>
            <Text style={fechaStyle}>
              Hoy/mañana/pollo
            </Text>
          </View>
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
