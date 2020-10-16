import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Icon, Input, Avatar } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import BasicModal from '../../components/BasicModal';
import { submitPost, uploadAudio, uploadVideo, uploadImage } from './actionCreator';
import styles from './styles';
    
const Post = () => {
    //state
    const [body, setBody] = useState('');
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);
    const [audio, setAudio] = useState(null);
    const [uploaded, setUploaded] = useState(null);
    const [modal, setModal] = useState({
        modalType: 'confirmation',
        showModal: false,
        modalTitle: '',
        modalComponent: null,
        pressOk: null,
        pressCancel: null
    });
    const { showModal, modalTitle, modalType, modalComponent, pressCancel, pressOk } = modal;

    const { navigate } = useNavigation();

    // redux
    const dispatch = useDispatch();
    const post = useSelector(state => state.reducerPost);
    const profile = useSelector(state => state.reducerProfile);

    // handle data pickers
    const uploadStatus = (error) => {
        setModal({
            ...modal,
            showModal: true,
            modalType: error ? 'error' : 'confirmation',
            modalTitle: error ? 'Has cancelado la carga del archivo' : 'Archivo cargado con éxito',
            pressCancel: () => setModal({ ...modal, showModal: false })
        });
    }

    const pickMedia = async (type) => {
        const { granted } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (!granted) {
            setModal({
                ...modal,
                showModal: true,
                modalType: 'error',
                modalTitle: 'Necesitamos permisos para acceder a la galería',
                pressCancel: () => setModal({ ...modal, showModal: false })
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
            type === 'video' ? setVideo(result) : setImage(result);
            uploadStatus(false);
            type === 'video' ? setUploaded('video') : setUploaded('image');
        } else {
            uploadStatus(true);
        }
    }
    const pickAudio = async () => {
        const audio = await DocumentPicker.getDocumentAsync({
            type: "audio/*"
        });
        if (!audio.cancelled) {
            setAudio(audio);
            uploadStatus(false);
            setUploaded('audio');
        } else {
            uploadStatus(true);
        }
    }
    //submit
    const submit = async (body, image, video, audio, uploaded) => {
        const { imageURL, videoURL, audioURL, error, message } = post;
        // const { uid, nickName } = profile; TODO: fetch data user
        const nickName = 'Pancho Villa'
        const uid = 2;
        const date = new Date.now();

        if (body.trim() === '' && uploaded === null) {
            setModal({
                ...modal,
                showModal: true,
                modalType: 'error',
                modalTitle: 'La publicación no puede estar vacía',
                pressCancel: () => setModal({ ...modal, showModal: false })
            });
        } else {
            image !== null && await dispatch(uploadImage(image, uid));
            video !== null && await dispatch(uploadVideo(video, uid));
            audio !== null && await dispatch(uploadAudio(audio, uid));

            if (error) {
                setModal({
                    ...modal,
                    showModal: true,
                    modalType: 'error',
                    modalTitle: message,
                    pressCancel: () => setModal({ ...modal, showModal: false })
                });
            } else {
                await dispatch(submitPost(uid, nickName, body, imageURL, videoURL, audioURL, uploaded, date));
                setModal({
                    ...modal,
                    showModal: true,
                    modalType: 'confirmation',
                    modalTitle: message,
                    pressCancel: () => {
                        setModal({ ...modal, showModal: false });
                        navigate('Inicio');
                    }
                });
            }
        }
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'silver' }}>
            {showModal && (
                <BasicModal
                    visible={showModal}
                    type={modalType}
                    requiredHeight={0.5}
                    title={modalTitle}
                    component={modalComponent || null}
                    onPressCancel={pressCancel}
                    onPressOk={pressOk}
                />
            )}
            <View style={styles.container}>
                <View style={styles.header}>
                    <Icon
                        name="arrow-left"
                        type='font-awesome'
                        onPress={() => navigate('Inicio')}
                        iconStyle={styles.icon}
                    />
                    <Text style={styles.title}> 
                        Crear publicación
                    </Text> 
                </View>
                {/*user component*/}
                <View style={styles.inputContainer}>
                    <Input
                        placeholder=' ¿Klk estás pensando?'
                        inputContainerStyle={styles.inputStyle}
                        containerStyle={styles.input}
                        onChange={(e) => setBody(e.nativeEvent.text)}
                        style={styles.placeholder}
                    />
                </View>
                <View style={styles.buttonsContainer}>
                    <View style={styles.iconContainer}>
                        <Icon
                            name="image"
                            type='ionicons'
                            size={30}
                            onPress={() => uploaded === null && pickMedia('image')}
                            iconStyle={styles.icons}
                        />
                        <Icon
                            name="video"
                            type='material-community'
                            size={30}
                            onPress={() => uploaded === null && pickMedia('video')}
                            iconStyle={styles.icons}
                        />
                        <Icon
                            name="music-box"
                            type='material-community'
                            size={30}
                            onPress={() => uploaded === null && pickAudio()}
                            iconStyle={styles.icons}
                        />
                    </View>
                    <Text
                        style={styles.submitStyle}
                        onPress={() => submit(body, image, video, audio, uploaded)}
                    >Publicar</Text>
                </View>
                {console.log(audio)}
                { uploaded !== null
                    && (
                        <View style={styles.preview}>
                            <Icon
                                name="close-circle"
                                type='material-community'
                                size={40}
                                onPress={() => {
                                    setImage(null);
                                    setAudio(null);
                                    setVideo(null);
                                    setUploaded(null);
                                }}
                                iconStyle={styles.icons}
                            />
                            { uploaded === 'audio'
                                ? (
                                    <View style={{alignItems: 'center'}}>
                                        <Icon
                                            name="music-box"
                                            type='material-community'
                                            size={120}
                                            color='#f22'
                                            iconStyle={styles.icons}
                                        />
                                        <Text>{audio.name}</Text>
                                    </View>
                                ) : (
                                    <Avatar
                                        source={image || video }
                                        size={120}
                                    />
                                )}
                        </View>
                    )}
            </View>
        </SafeAreaView>
        );
    }
    
export default Post;