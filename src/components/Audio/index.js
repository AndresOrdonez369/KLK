import React, { useState } from 'react';
import { Icon, Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { View } from 'react-native';
import { playerUpdate } from './audioAppActionCreator';
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
  /* useEffect(() => {
    const createSound = async () => {
      const { sound: soundObject, status } = await Audio.Sound.createAsync(
      { uri: source.mediaLink },
      { shouldPlay: false }
    );
    setAudio({...audio, objetosonido: soundObject})
  }
  createSound();
}, []); */
  /* useEffect(() => () =>{
    async function CleanAudio() {
      console.log("entre al clean")
      await objetosonido.stopAsync();
      const response = await objetosonido.unloadAsync();
      setAudio({ ...audio, objetosonido, audioController: false });
      console.log("response clean", response)
    }
   return CleanAudio();
}, []) */
  /* useEffect(() => {
    const manejo = async () => {
      console.log("estoy en el manejo")
      await objetosonido.stopAsync()
      setAudio({ ...audio, audioController false });
    }
    const pausaGlobal = () => globalKey == cid ? null : manejo()
    if(objetosonido != null) pausaGlobal();
  }, [globalKey]); */
  const playAudio = () => {
    if (source != mediaSource) {
    }
    dispatch(playerUpdate('play'));
    console.log('aqui se monta el audio');
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
