import { useSelector, useDispatch } from 'react-redux';
import { Audio } from 'expo-av';
import { audioObjUpdate } from './audioAppActionCreator';

const audioApp = async () => {
  Audio.setAudioModeAsync({
    allowsRecordingIOS: false,
    staysActiveInBackground: false,
    interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
    playsInSilentModeIOS: true,
    shouldDuckAndroid: true,
    interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    playThroughEarpieceAndroid: false,
  });
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

  if (audioObj != null) {
    // cambiar switch
    if (playerAction === 'pause') {
      await audioObj.pauseAsync();
    } if (playerAction === 'play') {
      await audioObj.playAsync();
    } if (playerAction === 'stop') {
      await audioObj.stopAsync();
    }
  }
  return audioObj;
};
export default audioApp;
