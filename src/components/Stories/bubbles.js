import React, { useState } from 'react';
import {
  View, StyleSheet, Dimensions, FlatList, Text, Image,
} from 'react-native';
import { Icon } from 'react-native-elements';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { useSelector, useDispatch } from 'react-redux';
import { postStory } from '../../screens/feed/actionCreator';
import SimpleAvatar from '../Avatar/SimpleAvatar';
import BasicModal from '../BasicModal';

const { height, width } = Dimensions.get('screen');

const Bubbles = ({
  pressStory, stories,
}) => {
  // state
  const [modal, setModal] = useState({
    showModal: false,
    modalType: '',
    title: '',
    component: null,
    pressCancel: null,
    pressOk: null,
  });
  const {
    showModal, modalType, title, component, pressCancel, pressOk,
  } = modal;
  // redux
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.reducerProfile);
  const { imageURL, user, uid } = profile;

  const renderStory = ({ item }) => (
    <View style={styles.bubbleContainer}>
      <SimpleAvatar
        size={height * 0.1}
        url={item.authorProfileImg}
        onPress={() => pressStory(item.authorID) || null}
      />
      <Text style={styles.textContainer}>{item.authorUsername}</Text>
    </View>
  );
  const pickStory = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      handleModal(true, 'error', 'Necesitamos permisos para acceder a la galería');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 2],
      quality: 1,
    });
    if (!result.cancelled) {
      const preview = (
        <Image
          style={styles.imgModal}
          source={result}
        />
      );
      handleModal(
        true,
        'interactive',
        '¿Deseas subir esta historia?',
        () => setModal({ ...modal, showModal: false }),
        () => post(result.uri, uid, user.userName, imageURL),
        preview,
      );
    } else {
      handleModal(true, 'error', 'Has cancelado la carga de la historia', () => setModal({ ...modal, showModal: false }));
    }
  };

  const post = async (img, id, nick, profileImg) => {
    handleModal(false);
    await dispatch(postStory(img, id, nick, profileImg));
  };

  const handleModal = (show, type = '', text = '', cancel = null, ok = null, compo = null) => {
    setModal({
      ...modal,
      showModal: show,
      modalType: type,
      title: text,
      component: compo,
      pressCancel: cancel,
      pressOk: ok,
    });
  };
  return (
    <View style={styles.container}>
      {showModal
        && (
          <BasicModal
            type={modalType}
            visible={showModal}
            title={title}
            onPressCancel={pressCancel}
            onPressOk={pressOk}
            component={component}
            requiredHeight={modalType === 'interactive' ? 0.4 : 0.3}
          />
        )}
      <FlatList
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={(
          <View style={styles.myBubble}>
            <View style={styles.bubbleContainer}>
              <SimpleAvatar
                size={height * 0.1}
                url={imageURL}
                onPress={() => pressStory(uid) || null}
              />
              <Text style={styles.textContainer}>{user.userName}</Text>
            </View>
            <View style={styles.iconContainer}>
              <Icon
                name="pluscircle"
                type="ant-design"
                color="#f22"
                size={styles.container.width * 0.07}
                onPress={() => pickStory()}
              />
            </View>
          </View>
          )}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        data={stories}
        renderItem={renderStory}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height * 0.13,
    width,
    backgroundColor: 'white',
    flexDirection: 'row',
    marginBottom: height * 0.015,
  },
  bubbleContainer: {
    height: height * 0.12,
    justifyContent: 'center',
    alignItems: 'center',
    width: height * 0.1,
  },
  textContainer: {
    fontSize: 12,
    fontWeight: 'bold',
    height: 15,
    width: height * 0.1,
    flexWrap: 'wrap',
    alignSelf: 'center',
    textAlign: 'center',
  },
  myBubble: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  iconContainer: {
    marginLeft: width * -0.06,
    marginTop: width * 0.05,
  },
  imgModal: {
    width: 75,
    height: 150,
    alignSelf: 'center',
    alignItems: 'center',
  },
});
export default Bubbles;
