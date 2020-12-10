import React, { useState, useCallback } from 'react';
import { View, Alert } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import styles from './style';

export default function Youtube({ id }) {
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('video has finished playing!');
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <YoutubePlayer
        height={styles.youtube.height}
        play={playing}
        videoId={id}
        onChangeState={onStateChange}
      />
    </View>
  );
}
