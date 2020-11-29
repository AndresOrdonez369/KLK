import React, { useState, useEffect } from 'react';
import { Icon, Button } from 'react-native-elements';
import { View } from 'react-native';
import { Audio } from 'expo-av';
import { useSelector, useDispatch } from 'react-redux';
import { idUpdate } from './audioAppActionCreator';
import styles from './styles';

const AudioComponent = ({ link, id }) => {
  const [audio, setAudio] = useState({
    audioController: true,
    mediaSource: link,
    playerAction: 'stop',
    playBack: null,
  });
  const {
    audioController, mediaSource, playBack,
  } = audio;
  const { mediaButtonStyle, playButtonStyle, mediaContainerStyle } = styles;
  const audioReducer = useSelector((state) => state.reducerAudio);
  const { aid } = audioReducer;
  const dispatch = useDispatch();
  useEffect(() => {
    const audioStart = async () => {
      Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        playThroughEarpieceAndroid: false,
      });
      if (playBack === null) {
        const { sound: playbackObject } = await Audio.Sound.createAsync(
          { uri: mediaSource },
        );
        setAudio({ ...audio, playBack: playbackObject });
      }
    };
    audioStart();
  }, []);

  useEffect(() => {
    const renderActionPause = async () => {
      if (aid !== id) await playBack.pauseAsync();
    };
    renderActionPause();
  }, [aid]);
  useEffect(() => () => {
    const audioEnd = async () => {
      if (playBack === null) {
        await playBack.unloadAsync();
      }
    };
    audioEnd();
  }, []);

  const playAudio = async () => {
    dispatch(idUpdate(id));
    await playBack.playAsync();
    setAudio({ ...audio, audioController: !audioController });
  };
  const pauseAudio = async () => {
    await playBack.pauseAsync();
    setAudio({ ...audio, audioController: !audioController });
  };
  const stopAudio = async () => {
    await playBack.stopAsync();
    setAudio({ ...audio, audioController: !audioController });
  };

  const renderButtons = () => (audioController ? (
    <View style={mediaContainerStyle}>
      <Button
        raised
        onPress={() => playAudio()}
        buttonStyle={playButtonStyle}
        icon={
          <Icon name="play" type="material-community" color="white" size={80} />
      }
      />
    </View>
  ) : (
    <View style={mediaContainerStyle}>
      <Button
        raised
        onPress={() => stopAudio()}
        buttonStyle={mediaButtonStyle}
        icon={
          <Icon name="stop" type="material-community" color="white" size={80} />
      }
      />
      <Button
        raised
        onPress={() => pauseAudio()}
        buttonStyle={mediaButtonStyle}
        icon={
          <Icon name="pause" type="material-community" color="white" size={80} />
      }
      />
    </View>
  ));
  return renderButtons();
};

export default AudioComponent;
