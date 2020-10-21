import React from 'react';
import {
  Modal, View, Text, StyleSheet, Dimensions, Image
} from 'react-native';
import { Button } from 'react-native-elements';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalText: {
    marginRight: 20,
    marginLeft: 20,
    textAlign: 'center',
    justifyContent: 'center',
  },
  modalTextTitle: {
    fontSize: height * 0.03,
    color: '#888',
  },
  row: {
    flex: 1,
    maxHeight: 120,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: height * 0.12,
  },
  circle: {
    height: 100,
    width: 100,
    marginBottom: -80,
    marginTop: -120,
    borderRadius: 100 / 2,
    backgroundColor: 'white',
  },
  spaceButton: {
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
  },
  ok: {
    width: width * 0.3,
    borderRadius: 20,
    marginRight: 20,
    backgroundColor: '#6CA928',
  },
  okNotification: {
    width: width * 0.5,
    borderRadius: 20,
    marginBottom: height * 0.05,
  },
  cancel: {
    width: width * 0.3,
    borderRadius: 20,
    marginLeft: 20,
    backgroundColor: 'grey',
  },
  imgModal: {
    height: 170,
    width: 170,
    position: 'absolute',
    top: height * -0.079,
  },
  imgView: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  contentContainer: {
    marginTop: 100,
  },
  modalViewStyle: (requiredHeight) => ({
    backgroundColor: '#E7EBE1',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    width,
    height: height * requiredHeight,
  }),
});

const BasicModal = ({
  visible,
  title,
  onPressOk,
  onPressCancel,
  type,
  requiredHeight,
  component,
  textOk,
  textCancel,
}) => {
  let buttons;
  if (type === 'interactive') {
    buttons = (
      <View style={[styles.row, styles.spaceButton]}>
        <Button
          title={textOk || 'Si'}
          buttonStyle={styles.ok}
          onPress={onPressOk}
        />
        <Button
          title={textCancel || 'No'}
          buttonStyle={styles.cancel}
          onPress={onPressCancel}
        />
      </View>
    );
  } else if (type === 'confirmation' || type === 'error') {
    buttons = (
      <Button
        title="Ok"
        buttonStyle={[
          styles.okNotification,
          { backgroundColor: type === 'confirmation' ? '#6CA928' : '#BD1522' },
        ]}
        onPress={onPressCancel}
      />
    );
  }
  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onPressCancel}
      type={type}
    >
      <View style={styles.container}>
        <View style={styles.centeredView}>
          <View style={styles.modalViewStyle(requiredHeight)}>
            <View style={styles.contentContainer}>
              {title && (
              <Text style={[styles.modalText, styles.modalTextTitle]}>
                {title}
              </Text>
              )}
              {component}
            </View>
            {buttons}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default BasicModal;