import React, { useState } from 'react';
import { Icon, Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { View } from 'react-native';
import { playerUpdate, sourceUpdate } from './audioAppActionCreator';
import styles from './styles';

const AudioComponent = (mediaLink) => {
  const [audio, setAudio] = useState({
    audioController: true,
    mediaSource: mediaLink,
  });
  const dispatch = useDispatch();
  const { audioController, mediaSource } = audio;
  const { mediaButtonStyle, playButtonStyle, mediaContainerStyle } = styles;
  const audioState = useSelector((state) => state.reducerAudio);
  const { source } = audioState;

  const playAudio = () => {
    if (source !== mediaSource) {
      dispatch(sourceUpdate(mediaSource));
    }
    dispatch(playerUpdate('play'));
    setAudio({ audioController: !audioController });
  };
  const pauseAudio = () => {
    dispatch(playerUpdate('pause'));
    setAudio({ audioController: !audioController });
  };
  const stopAudio = () => {
    dispatch(playerUpdate('stop'));
    setAudio({ audioController: !audioController });
  };

  const renderButtons = () => (audioController ? (
    <Button
      raised
      onPress={() => playAudio()}
      buttonStyle={playButtonStyle}
      icon={
        <Icon name="play" type="material-community" color="black" size={150} />
      }
    />
  ) : (
    <View style={mediaContainerStyle}>
      <Button
        raised
        onPress={() => stopAudio()}
        buttonStyle={mediaButtonStyle}
        icon={
          <Icon name="stop" type="material-community" color="black" size={120} />
      }
      />
      <Button
        raised
        onPress={() => pauseAudio()}
        buttonStyle={mediaButtonStyle}
        icon={
          <Icon name="pause" type="material-community" color="black" size={120} />
      }
      />
    </View>
  ));
  return renderButtons();
};

export default AudioComponent;
