import React, { useState, useEffect } from 'react';
import { Icon, Button, } from 'react-native-elements';
import { Audio } from 'expo-av';
import styles from './styles';

const AudioComponent = (mediaLink) => {
  const [audio, setAudio] = useState({
    audioActive: false,
    audioError: false,
    source: mediaLink,
    objetosonido: null,
  });
  const { audioActive, audioError, source, objetosonido } = audio;
  const {  mediaButtonStyle } = styles;
  useEffect(() => {
    const prueba = async () => {
      const { sound: soundObject, status } = await Audio.Sound.createAsync(
      { uri: source.mediaLink },
      { shouldPlay: false }
    );
    setAudio({...audio, objetosonido: soundObject})
  }
  prueba();
    return () => {
      async function CleanAudio() {
        const response = await soundObject.unloadAsync();
      }
      CleanAudio();
    }
  }, []);
  const renderOnPress = () => {
    const play = async () => {
      await objetosonido.playAsync();
      setAudio({ ...audio, audioActive: true });
      // await soundObject.pauseAsync();
    };
    const pause = async () => {
      await objetosonido.pauseAsync();
      setAudio({ ...audio, audioActive: false });
    };
    return audioActive ? pause() : play();
  };
  const renderIconName = () => {
    return audioActive ? "pause" : "play"
  }
  return (
    <Button
      raised
      onPress={() => renderOnPress()}
      buttonStyle={mediaButtonStyle}
      icon={
        <Icon name={renderIconName()} type="material-community" color="black" size={150} />
      }
    />
  );
};

export default AudioComponent;
