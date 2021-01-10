import React from 'react';
import {
  Dimensions, StyleSheet, View, Linking, SafeAreaView, StatusBar,
} from 'react-native';
import { useDispatch } from 'react-redux';
import {
  Icon,
  Button,
} from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

import { signOut } from './actionCreator';

const { height, width } = Dimensions.get('screen');

const Settings = () => {
  // eslint-disable-next-line no-underscore-dangle
  const _handleOpenWithLinking = () => {
    Linking.openURL('https://klkmessenger.norterecords.com/');
  };
  // redux
  const dispatch = useDispatch();

  const { navigate } = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f22' }}>
      <View style={styles.container}>
        <View style={styles.icon}>
          <Icon
            name="arrow-left"
            type="font-awesome"
            onPress={() => navigate('PerfilStack')}
            color="#f22"
            size={35}
          />
        </View>
        <View style={styles.containerButton}>
          <Button
            title="Términos y condiciones"
            buttonStyle={styles.buttonSubmit}
            onPress={_handleOpenWithLinking}
          />
          <Button
            title="Cerrar sesión"
            buttonStyle={styles.buttonSubmit}
            onPress={() => dispatch(signOut())}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height,
    width,
    backgroundColor: 'white',
    marginTop: StatusBar.currentHeight || 0,

  },
  containerButton: {
    height,
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
  },
  icon: {
    position: 'absolute',
    left: width * 0.06,
    marginTop: height * 0.01,
  },
  buttonSubmit: {
    backgroundColor: '#f22',
    borderRadius: 20,
    width: width * 0.6,
    alignSelf: 'center',
    marginTop: height * 0.04,
  },
});

export default Settings;
