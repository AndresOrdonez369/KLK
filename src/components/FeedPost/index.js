/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import {
  View, Text, Image, Share, TouchableHighlight, ActivityIndicator,
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
import { activateRealPosts, getHiddenPosts } from '../../screens/feed/actionCreator';
import firebase from '../../../firebase';
import styles from './styles';
import { updateCleanComments } from '../../screens/comments/actionCreator';

const FeedPost = ({
  authorName, mensaje, mediaLink, likes, type, timestamp, url, pid,
  authorId, blockComment = false, screen = 'Inicio', dissable = false,
}) => {
  const {
    container, headerContainer, basicInfoContainer, dotsContainer,
    bodyContainer, messageContainer, mediaContainer, bottomContainer, iconsContainer,
    dotsButtonStyle, messageStyle, likesStyle, likesContainer,
  } = styles;
  const [like, setLike] = useState(false);
  const [modal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const profile = useSelector((state) => state.reducerProfile);
  const feed = useSelector((state) => state.reducerHome);
  const { realDataAction } = feed;
  const { uid } = profile;
  const dispatch = useDispatch();
  const { navigate } = useNavigation();

  let firebaseQuery = {};
  if (authorId !== '' && pid !== '' && uid !== '') {
    firebaseQuery = firebase.firestore().collection('posts').doc(authorId).collection('userPosts')
      .doc(pid)
      .collection('likes')
      .doc(uid);
  }
  const onHidePress = async () => {
    if (uid !== '') {
      setIsLoading(true);
      const hidenPostPath = await firebase.firestore().collection('users').doc(uid).collection('hidenPosts');
      await hidenPostPath.add({ publication: pid });
      await dispatch(getHiddenPosts(profile.uid));
      dispatch(activateRealPosts(!realDataAction));
      setIsLoading(false);
      setShowModal(false);
    }
  };
  const deletePost = async () => {
    if (uid !== '') {
      setIsLoading(true);
      const postPath = firebase.firestore().collection('posts').doc(profile.uid).collection('userPosts')
        .doc(pid);
      await postPath.delete();
      setIsLoading(false);
      setShowModal(false);
    }
  };

  const commentNavigate = async () => {
    const postObject = {
      authorName, mensaje, mediaLink, likes, type, timestamp, url, pid, authorId,
    };
    await dispatch(updateCleanComments);
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
  const onAvatarPressed = () => {
    if (dissable !== true) {
      if (uid !== authorId) {
        navigate('AnotherProfile', { uid: authorId, actualScreen: screen });
      } else {
        navigate('Perfil');
      }
    }
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
      // eslint-disable-next-line no-useless-escape
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
            title={authorId === profile.uid ? '¿Desea eliminar esta publicación?' : '¿Desea ocultar esta publicación?'}
            onPressCancel={() => setShowModal(false)}
            onPressOk={() => {
              if (authorId !== profile.uid) onHidePress(); else deletePost();
            }}
            requiredHeight={0.4}
            component={isLoading && <ActivityIndicator />}
          />
        )}
      <View style={headerContainer}>
        <TouchableHighlight underlayColor="#ffc4c4" onPress={() => (screen === 'AnotherProfile' ? null : onAvatarPressed())}>
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
