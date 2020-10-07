import React, { PureComponent } from 'react';
import {
  Avatar, Overlay, Text, Divider, Button, Icon
} from 'react-native-elements';
import {
  View, ActivityIndicator, StyleSheet, Dimensions, Image
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { connect } from 'react-redux';
import firebase from '../../../firebase';
import i18n from '../../translations';
import { userUploadImagen, showModalProfile } from '../../screens/Profile/actionCreator';
import interactive from '../../../assets/modalInteractiveImg.png';

const requirePhoto = require('../../../assets/busyPosition.png');

const { width, height } = Dimensions.get('window');

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
    backgroundColor: 'green'
  },
  buttonDiscardStyle: {
    width: width * 0.3,
    borderRadius: 20,
    backgroundColor: 'gray'
  },
  modalTextTitle: {
    fontSize: height * 0.03,
    color: 'grey',
    margin: 12,
    marginTop: height * 0.08
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

class ProfilePicture extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      imagen: null,
      overlayVisible: false,
      isLoading: false,
    };
  }

  toggleOverlay = () => {
    this.setState((preState) => ({
      ...preState,
      overlayVisible: !preState.overlayVisible,
    }));
  };

  toggleLoading = () => {
    this.setState((preState) => ({
      ...preState,
      isLoading: !preState.isLoading,
    }));
  };

  pickImage = async () => {
    const { showModal } = this.props;
    const { granted } = await ImagePicker.requestCameraRollPermissionsAsync();
    if (!granted) {
      showModal(i18n.t('weNeedGalleryPerms'), 'error');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      this.setState((preState) => ({
        ...preState,
        imagen: result,
        overlayVisible: true,
      }));
    } else {
      showModal(i18n.t('galleryCancel'), 'error');
    }
  };

  uploadProfileImage = async () => {
    const { uploadImagen } = this.props;
    const { imagen } = this.state;
    this.toggleLoading();
    await uploadImagen(imagen.uri);
    this.setState((preState) => ({
      ...preState,
      isLoading: !preState.isLoading,
      overlayVisible: !preState.overlayVisible,
    }));
  };

  render() {
    const { imagen, isLoading, overlayVisible } = this.state;
    const { photoURL } = firebase.auth().currentUser;
    const { profile, showModal } = this.props;
    const { uploadPhotoError } = profile;
    const imgUser = photoURL
      ? { uri: photoURL }
      : requirePhoto;

    if (isLoading) {
      return <ActivityIndicator size="large" />;
    }

    return (
      <>
        {uploadPhotoError !== '' && (
          showModal(i18n.t('defaultError'), 'error')
        )}
        <View
          style={styles.generalView}
        >
          <Avatar
            rounded
            size={190}
            overlayContainerStyle={{ backgroundColor: 'gray', margin: 10 }}
            titleStyle={{ color: 'green' }}
            showAccessory
            accessory={{
              onPress: () => this.pickImage(),
              style: {
                backgroundColor: 'silver',
                borderRadius: 50,
              },
            }}
            source={imgUser}
          />
          <Overlay
            isVisible={overlayVisible}
            overlayStyle={styles.overlay}
          >
            <Image
              resizeMode="center"
              source={interactive}
              style={styles.imgModal}
            />
            <View
              style={styles.overlayView}
            >
              <Avatar rounded size={160} source={imagen} />
              <Text style={styles.modalTextTitle}>
                {i18n.t('uWannaSavePicture')}
              </Text>
              <Divider />
              <View
                style={styles.buttonView}
              >
                <Button
                  buttonStyle={styles.buttonSaveStyle}
                  type="outline"
                  title={i18n.t('savePicture')}
                  titleStyle={{ color: 'white' }}
                  icon={<Icon name="check-box" size={24} color="white" type="material" />}
                  onPress={this.uploadProfileImage}
                />

                <Button
                  buttonStyle={styles.buttonDiscardStyle}
                  type="outline"
                  title={i18n.t('discardPicture')}
                  titleStyle={{ color: 'white' }}
                  icon={<Icon name="cancel" size={24} color="white" type="material" />}
                  onPress={this.toggleOverlay}
                />
              </View>
            </View>
          </Overlay>
        </View>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { profile } = state;
  return {
    profile
  };
};

const mapDispatchToProps = {
  uploadImagen: userUploadImagen,
  showModal: showModalProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePicture);