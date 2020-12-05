/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import {
  View, Text, Image, Share, TouchableHighlight,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Icon, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Video } from 'expo-av';
import * as Linking from 'expo-linking';
import BasicModal from '../BasicModal';
import Avatar from '../Avatar/SimpleAvatar';
import AudioComponent from '../Audio';
import Youtube from '../Youtube';
import firebase from '../../../firebase';
import styles from './styles';

const FeedPost = ({
  authorName, mensaje, mediaLink, likes, type, timestamp, url, pid,
  authorId, blockComment = false, screen = 'Inicio',
}) => {
  const {
    container, headerContainer, basicInfoContainer, dotsContainer,
    bodyContainer, messageContainer, mediaContainer, bottomContainer, iconsContainer,
    dotsButtonStyle, messageStyle, likesStyle, likesContainer,
  } = styles;
  const [like, setLike] = useState(false);
  const [modal, setShowModal] = useState(false);
  const profile = useSelector((state) => state.reducerProfile);
  const { uid } = profile;
  const { navigate } = useNavigation();
  const dispatch = useDispatch();

  let firebaseQuery = {};
  if (authorId !== '' && pid !== '' && uid !== '') {
    firebaseQuery = firebase.firestore().collection('posts').doc(authorId).collection('userPosts')
      .doc(pid)
      .collection('likes')
      .doc(uid);
  }
  const onHidePress = async () => {
    if (uid !== '') {
      const hidenPostPath = await firebase.firestore().collection('users').doc(uid).collection('hidenPosts');
      hidenPostPath.add({ publication: pid });
      setShowModal(false);
    }
  };

  const commentNavigate = () => {
    const postObject = {
      authorName, mensaje, mediaLink, likes, type, timestamp, url, pid, authorId,
    };
    navigate('Comments', { screen, postObject });
  };
  useEffect(() => {
    const getLike = async () => {
      if (firebaseQuery !== {}) {
        await firebaseQuery.get().then((doc) => {
          if (doc.exists && doc.data().userlike) {
            setLike(true);
          } else {
            setLike(false);
          }
        }).catch((error) => {
          console.log('Error getting document:', error);
        });
      }
    };
    getLike();
  }, [firebaseQuery]);
  useEffect(() => {
    const uploadLike = async () => {
      if (firebaseQuery !== {}) {
        await firebaseQuery.set({ userlike: like }, { merge: true });
      }
    };
    uploadLike();
  }, [like]);

  const onSharePress = async () => {
    const link = Linking.makeUrl(`post/${authorId}/${pid}`);
    const message = `Mira esta publicacion de KLK msn,
si no tienes la aplicacion la puedes descargar 
Link de descarga: ...
Si ya tienes el app instalada puedes ver la publicacion aqui 
${link}`;
    await Share.share({
      message,
    });
  };
  const renderMedia = () => {
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
      return (
        <AudioComponent
          id={pid}
          link={mediaLink}
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
          useNativeControls
        />
      );
    }
    if (type === 'youtube') {
      const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
      let videoId = mediaLink.match(regExp);
      videoId = videoId.pop();
      return (
        <Youtube id={videoId} />
      );
    }
    return null;
  };
  return (
    <View style={container}>
      {modal
        && (
          <BasicModal
            type="interactive"
            visible={modal}
            title="Desea ocultar esta publicación ?"
            onPressCancel={() => setShowModal(false)}
            onPressOk={() => onHidePress()}
            requiredHeight={0.4}
          />
        )}
      <View style={headerContainer}>
        <TouchableHighlight onPress={() => navigate('AnotherProfile', { authorId, screen })}>
          <View style={basicInfoContainer}>
            <Avatar size={94} name={authorName} date={timestamp} url={url} />
          </View>
        </TouchableHighlight>
        <View style={dotsContainer}>
          <Button
            buttonStyle={dotsButtonStyle}
            onPress={() => setShowModal(true)}
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
          {renderMedia()}
        </View>
      </View>
      <View style={bottomContainer}>
        <View style={iconsContainer}>
          <Button
            buttonStyle={dotsButtonStyle}
            onPress={() => (like ? setLike(false) : setLike(true))}
            icon={
              <Icon name={like ? 'heart' : 'heart-outline'} type="material-community" color={like ? '#f22' : 'gray'} size={25} />
            }
          />
          <Button
            buttonStyle={dotsButtonStyle}
            onPress={() => (blockComment ? null : commentNavigate())}
            icon={
              <Icon name="comment-multiple" type="material-community" color="gray" size={25} />
            }
          />
          <Button
            buttonStyle={dotsButtonStyle}
            onPress={() => onSharePress()}
            icon={
              <Icon name="share" type="material-community" color="#f22" size={25} />
            }
          />
        </View>
        <View style={likesContainer}>
          <Text style={likesStyle}>{like ? likes + 1 : likes}</Text>
        </View>
      </View>
    </View>
  );
};

export default FeedPost;
