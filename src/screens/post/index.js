import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import {
  Icon, Input, Avatar, Overlay, Button,
} from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import SimpleAvatar from '../../components/Avatar/SimpleAvatar';
import BasicModal from '../../components/BasicModal';
import InputBasic from '../../components/InputBasic/inputBasic';
import {
  submitPost, uploadAudio, uploadVideo, uploadImage, updateLoader, cleanNewPost, uploadYoutube,
} from './actionCreator';
import {
  getPosts,
} from '../feed/actionCreator';
import styles from './styles';

const Post = () => {
  // state
  const [body, setBody] = useState('');
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [audio, setAudio] = useState(null);
  const [uploaded, setUploaded] = useState(null);
  const [postdb, setPostdb] = useState(false);
  const [modal, setModal] = useState({
    modalType: 'confirmation',
    showModal: false,
    modalTitle: '',
    pressOk: null,
    pressCancel: null,
  });
  const {
    showModal, modalTitle, modalType, pressCancel, pressOk,
  } = modal;

  const { navigate } = useNavigation();

  // redux
  const dispatch = useDispatch();
  const post = useSelector((state) => state.reducerPost);
  const profile = useSelector((state) => state.reducerProfile);
  const {
    isLoading, mediaURL, error, message,
  } = post;
  const { uid, user, imageURL } = profile;
  const { name } = user;

  // handle data pickers
  const uploadStatus = (err) => {
    setModal({
      ...modal,
      showModal: true,
      modalType: err ? 'error' : 'confirmation',
      modalTitle: err ? 'Has cancelado la carga del archivo' : 'Archivo cargado con éxito',
      pressCancel: () => setModal({ ...modal, showModal: false }),
    });
  };

  const pickMedia = async (type) => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      setModal({
        ...modal,
        showModal: true,
        modalType: 'error',
        modalTitle: 'Necesitamos permisos para acceder a la galería',
        pressCancel: () => setModal({ ...modal, showModal: false }),
      });
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: type === 'video' ? ImagePicker.MediaTypeOptions.Videos : ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      videoMaxDuration: 300,
    });
    if (!result.cancelled) {
      if (type === 'video') setVideo(result); else setImage(result);
      uploadStatus(false);
      if (type === 'video') setUploaded('video'); else setUploaded('image');
    } else {
      uploadStatus(true);
    }
  };
  const pickAudio = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      setModal({
        ...modal,
        showModal: true,
        modalType: 'error',
        modalTitle: 'Necesitamos permisos para acceder a la galería',
        pressCancel: () => setModal({ ...modal, showModal: false }),
      });
      return;
    }
    const aud = await DocumentPicker.getDocumentAsync({
      type: 'audio/*',
    });
    if (aud.type === 'success') {
      setAudio(aud);
      uploadStatus(false);
      setUploaded('audio');
    } else {
      uploadStatus(true);
    }
  };
  // Loader
  const loader = () => (
    <Overlay isVisible={isLoading} overlayStyle={styles.overlay}>
      <View style={styles.overlayView}>
        <ActivityIndicator size="large" color="#f22" />
        <Text style={styles.overlayText}>...Subiendo archivo</Text>
      </View>
    </Overlay>
  );
  // submit
  const submit = async (description, imageObject, videoObject, audioObject, type) => {
    if (description.trim() === '' && uploaded === null) {
      setModal({
        ...modal,
        showModal: true,
        modalType: 'error',
        modalTitle: 'La publicación no puede estar vacía',
        pressCancel: () => setModal({ ...modal, showModal: false }),
      });
    } else {
      dispatch(updateLoader(true));
      if (imageObject === null && audioObject === null && videoObject === null && uploaded !== 'youtube') setUploaded('text');
      if (imageObject !== null && type === 'image') await dispatch(uploadImage(imageObject.uri, uid));
      if (videoObject !== null && type === 'video') await dispatch(uploadVideo(videoObject.uri, uid));
      if (audioObject !== null && type === 'audio') await dispatch(uploadAudio(audioObject.uri, audio.name, uid));

      setPostdb(true);
    }
    dispatch(getPosts(uid));
  };
  useEffect(() => {
    const postFirestore = async () => {
      const date = Date.now();
      if (error) {
        setModal({
          ...modal,
          showModal: true,
          modalType: 'error',
          modalTitle: message,
          pressCancel: () => setModal({ ...modal, showModal: false }),
        });
      } else {
        await dispatch(submitPost(uid, name, body, mediaURL, uploaded, date));
        dispatch(updateLoader(false));
        setModal({
          ...modal,
          showModal: true,
          modalType: 'confirmation',
          modalTitle: 'Publicación cargada correctamente',
          pressCancel: () => {
            setModal({ ...modal, showModal: false });
            cleanPost();
            navigate('Inicio');
          },
        });
      }
    };
    if (postdb && (mediaURL !== '' || (uploaded === 'text' && body !== ''))) {
      postFirestore();
      setPostdb(false);
    } else if (postdb && (uploaded === 'youtube' && mediaURL === '')) {
      dispatch(updateLoader(false));
      setModal({
        ...modal,
        showModal: true,
        modalType: 'error',
        modalTitle: 'El campo Youtube Link no puede estar vacío',
        pressCancel: () => setModal({ ...modal, showModal: false }),
      });
    }
  }, [postdb, mediaURL, message]);
  const cleanPost = () => {
    setBody('');
    setAudio(null);
    setImage(null);
    setVideo(null);
    setUploaded(null);
    dispatch(cleanNewPost());
  };
  // conditional render
  let options;
  if (uploaded === 'audio') {
    options = (
      <View style={{ alignItems: 'center' }}>
        <Icon
          name="music-box"
          type="material-community"
          size={120}
          color="#f22"
          iconStyle={styles.icons}
        />
        <Text>{audio.name}</Text>
      </View>
    );
  } else if (uploaded === 'youtube') {
    options = (
      <InputBasic
        placeholder="YouTube link"
        value={mediaURL}
        changeText={(text) => dispatch(uploadYoutube(text))}
      />
    );
  } else {
    options = (
      <Avatar
        source={image || video}
        size={120}
        rounded
      />
    );
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f22' }}>
      {showModal && (
        <BasicModal
          visible={showModal}
          type={modalType}
          requiredHeight={0.3}
          title={modalTitle}
          onPressCancel={pressCancel}
          onPressOk={pressOk}
        />
      )}
      <View style={styles.container}>
        <View style={styles.header}>
          <Icon
            name="arrow-left"
            type="font-awesome"
            onPress={() => navigate('Inicio')}
            iconStyle={styles.icon}
          />
          <Text style={styles.title}>
            Crear publicación
          </Text>
        </View>
        <SimpleAvatar
          size={styles.container.height * 0.12}
          url={imageURL}
          name={name || 'nombre'}
        />
        <View style={styles.inputContainer}>
          <Input
            placeholder=" ¿Klk estás pensando?"
            inputContainerStyle={styles.inputStyle}
            containerStyle={styles.input}
            onChange={(e) => setBody(e.nativeEvent.text)}
            value={body}
            style={styles.placeholder}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <View style={styles.iconContainer}>
            <Icon
              name="image"
              type="ionicons"
              size={30}
              onPress={() => uploaded === null && pickMedia('image')}
              iconStyle={styles.icons}
            />
            <Icon
              name="video"
              type="material-community"
              size={30}
              onPress={() => uploaded === null && pickMedia('video')}
              iconStyle={styles.icons}
            />
            <Icon
              name="music-box"
              type="material-community"
              size={30}
              onPress={() => uploaded === null && pickAudio()}
              iconStyle={styles.icons}
            />
            <Icon
              name="youtube-square"
              type="font-awesome"
              size={30}
              onPress={() => uploaded === null && setUploaded('youtube')}
              iconStyle={styles.icons}
            />
          </View>
          <Button
            title="Publicar"
            onPress={() => submit(body, image, video, audio, uploaded)}
            buttonStyle={styles.buttonSubmit}
          />
        </View>
        { uploaded !== null
          && (
            <View style={styles.preview(uploaded)}>
              <Icon
                name="close-circle"
                type="material-community"
                size={40}
                onPress={() => {
                  setImage(null);
                  setAudio(null);
                  setVideo(null);
                  setUploaded(null);
                }}
                iconStyle={styles.icons}
              />
              {options}
            </View>
          )}
        { isLoading && loader() }
      </View>
    </SafeAreaView>
  );
};

export default Post;
