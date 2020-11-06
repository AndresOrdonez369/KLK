import { useSelector, useDispatch } from 'react-redux';
import { Audio } from 'expo-av';
import { audioObjUpdate } from './audioAppActionCreator';

const audioApp = async () => {
  const dispatch = useDispatch();
  // const PlayerApp = new Player('https://firebasestorage.googleapis.com/v0/b/klk-messenger.appspot.com/o/posts%2Faudios%2F2%2FAnd%20It%20Was%20So.mp3?alt=media&token=a7301cb3-1bab-4ed6-883d-e18b8421bd31');
  const stateAudio = useSelector((state) => state.reducerAudio);
  const { source, playerAction, audioObj } = stateAudio;

  if (audioObj == null) {
    // setAudioModeAsync
    const { sound: playbackObject } = await Audio.Sound.createAsync(
      { uri: 'https://firebasestorage.googleapis.com/v0/b/klk-messenger.appspot.com/o/posts%2Faudios%2F2%2FAnd%20It%20Was%20So.mp3?alt=media&token=a7301cb3-1bab-4ed6-883d-e18b8421bd31' },
    );
    dispatch(audioObjUpdate(playbackObject));
  }
  console.log('este es el playerAc', playerAction);
  console.log('entre al audio', audioObj);
  if (audioObj != null) {
    // cambiar switch
    console.log('Entre al nonull');
    if (playerAction === 'pause') {
      console.log('Entre al pausa');
      await audioObj.pauseAsync();
    } if (playerAction === 'play') {
      console.log('Entre al play');
      await audioObj.playAsync();
    } if (playerAction === 'stop') {
      console.log('Entre al stop');
      await audioObj.stopAsync();
    }
  }
  return audioObj;
};
export default audioApp;
