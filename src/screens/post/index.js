import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Icon, Input, Avatar } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import BasicModal from '../../components/BasicModal';
import { uploadAudio, uploadImage, uploadVideo, submitPost } from './actionCreator';
import styles from './styles';
    
const Post = () => {
    //state
    const [body, setBody] = useState('');
    const [image, setImage] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modal, setModal] = useState({
        modalType: 'confirmation',
        modalTitle: '',
        modalComponent: null,
        pressOk: null,
        pressCancel: null
    });
    const { modalTitle, modalType, modalComponent, pressCancel, pressOk } = modal;

    const { navigate } = useNavigation();
    const dispatch = useDispatch();

    const pickImage = async () => {
        const { granted } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (!granted) {
            setModal({
                ...modal,
                modalType: 'error',
                modalTitle: 'Necesitamos permisos para acceder a la galería',
                pressCancel: () => setShowModal(false)
            });
            setShowModal(true);
            return;
        }
    
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.cancelled) {
            setImage(result);
            setModal({
                ...modal,
                modalType: 'interactive',
                modalTitle: '¿Deseas seleccionar esta imagen?',
                modalComponent: <Avatar size={160} source={image} />,
                pressOk: () => {
                    setImage(result);
                    setShowModal(false);
                },
                pressCancel: () => {
                    setImage(null);
                    setShowModal(false);
                },
            });
            setShowModal(true);
        } else {
            setModal({
                ...modal,
                modalType: 'error',
                modalTitle: 'Has cancelado la carga de la imagen',
                pressCancel: () => setShowModal(false)
            });
            setShowModal(true);
        }
        dispatch(uploadImage())
    }
    const pickVideo = () => {
        dispatch(uploadVideo())
    }
    const pickAudio = () => {
        dispatch(uploadAudio())
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'silver' }}>
            {showModal && (
                <BasicModal
                    visible={showModal}
                    type={modalType}
                    requiredHeight={0.65}
                    title={modalTitle}
                    component={modalComponent}
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
                            onPress={() => pickImage()}
                            iconStyle={styles.icons}
                        />
                        <Icon
                            name="video"
                            type='material-community'
                            size={30}
                            onPress={() => pickVideo()}
                            iconStyle={styles.icons}
                        />
                        <Icon
                            name="music-box"
                            type='material-community'
                            size={30}
                            onPress={() => pickAudio()}
                            iconStyle={styles.icons}
                        />
                    </View>
                    <Text
                        style={styles.submitStyle}
                        onPress={() => dispatch(submitPost(body))}
                    >Publicar</Text>
                </View>
            </View>
        </SafeAreaView>
        );
    }
    
export default Post;