import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Avatar,
  Overlay,
  Text,
  Divider,
  Button,
  Icon,
} from 'react-native-elements';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import firebase from '../../../firebase';
import {
  userUploadImagen,
  showModalProfile,
} from '../../screens/profile/actionCreator';
const requirePhoto = require('../../../assets/busyPosition.png');

const { width, height } = Dimensions.get('window');

const ProfilePicture = () => {
  const [imagen, setImagen] = useState(null);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const pickImage = async () => {
    const { granted } = await ImagePicker.requestCameraRollPermissionsAsync();
    if (!granted) {
      showModalProfile('Necesitamos permisos para acceder a la  galería');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImagen(result);
      setOverlayVisible(true);
    } else {
      showModalProfile('Has cancelado la carga de imagen');
    }
  };

  const uploadProfileImage = async () => {
    setIsLoading(true);
    console.log(imagen,"1")
    await dispatch(userUploadImagen(imagen.uri));
    console.log(imagen,"bandera")
    setIsLoading(false);
    setOverlayVisible(!overlayVisible);
  };

  const { photoURL } = firebase.auth().currentUser;
  const { uploadPhotoError } = useSelector((state) => state.reducerProfile);
  const imgUser = photoURL ? { uri: photoURL } : requirePhoto;

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <>
      {uploadPhotoError !== '' && showModalProfile('Error desconocido, inténtalo más tarde', 'error')}
      <View style={styles.generalView}>
        <Avatar
          rounded
          size={190}
          overlayContainerStyle={{ backgroundColor: 'gray', margin: 10 }}
          titleStyle={{ color: 'green' }}
          showAccessory
          accessory={{
            onPress: () => pickImage(),
            style: {
              backgroundColor: 'silver',
              borderRadius: 50,
            },
          }}
          source={imgUser}
        />
        <Overlay isVisible={overlayVisible} overlayStyle={styles.overlay}>
         <View style={styles.overlayView}>
            <Avatar rounded size={160} source={imagen} />
            <Text style={styles.modalTextTitle}>
              ¿Quieres guardar esta imagen?
            </Text>
            <Divider />
            <View style={styles.buttonView}>
              <Button
                buttonStyle={styles.buttonSaveStyle}
                type="outline"
                title="Guardar foto"
                titleStyle={{ color: 'white' }}
                icon={(
                  <Icon
                    name="check-box"
                    size={24}
                    color="white"
                    type="material"
                  />
                  )}
                onPress={()=>uploadProfileImage()}
              />

              <Button
                buttonStyle={styles.buttonDiscardStyle}
                type="outline"
                title=""
                titleStyle={{ color: 'white' }}
                icon={
                  <Icon name="cancel" size={24} color="white" type="material" />
                  }
                onPress={() => setOverlayVisible(!overlayVisible)}
              />
            </View>
          </View>
        </Overlay>
      </View>
    </>
  );
};
export default ProfilePicture;

const styles = StyleSheet.create({
  generalView: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.13,
  },
  buttonView: {
    margin: 0,
    width: 300,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonSaveStyle: {
    width: width * 0.3,
    borderRadius: 20,
    backgroundColor: 'green',
  },
  buttonDiscardStyle: {
    width: width * 0.3,
    borderRadius: 20,
    backgroundColor: 'gray',
  },
  modalTextTitle: {
    fontSize: height * 0.03,
    color: 'grey',
    margin: 12,
    marginTop: height * 0.08,
  },
  overlay: {
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: '#E7EBE1',
    position: 'absolute',
    height: height * 0.65,
    top: height * 0.45,
    width,
  },
  imgModal: {
    height: 170,
    width: 170,
    position: 'absolute',
    top: height * -0.079,
    alignSelf: 'center',
  },
});
