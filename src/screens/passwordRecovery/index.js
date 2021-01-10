import React, { useState } from 'react';
import {
  Dimensions, StyleSheet, View, Text,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import InputBasic from '../../components/InputBasic/inputBasic';
import ButtonBasic from '../../components/ButtonBasic/ButtonBasic';
import passwordRecovery from './actionCreator';

const { height, width } = Dimensions.get('screen');

const PassRecovery = () => {
  // state
  const [input, setInput] = useState({ user: '' });
  const { navigate } = useNavigation();
  // recuperar contraseña
  const dispatch = useDispatch();
  const pressRecovery = (user) => {
    dispatch(passwordRecovery(user));
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'silver' }}>
      <View style={styles.containerScreen}>
        <View style={styles.icon}>
          <Icon
            name="arrow-left"
            type="font-awesome"
            onPress={() => navigate('Login')}
            color="#f22"
            size={35}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.textStart}>¿Tienes problemas para entrar? </Text>
          <Text style={styles.textInfo}>
            Introduce tu nombre de usuario o dirección de correo electrónico
            y enviaremos un enlace para que recuperes el acceso a tu cuenta.
            {' '}
          </Text>
          <InputBasic
            placeholder="Nombre de usuario o correo electrónico"
            value={input.user}
            changeText={(text) => setInput({ user: text })}
          />
          <ButtonBasic
            text="Enviar"
            buttonStyle={styles.buttonStyle}
            textStyle={styles.textButtons}
            onPress={() => pressRecovery(input.user)}
          />
          <Text style={styles.textDiv}>----------◌----------</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height,
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerScreen: {
    height,
    width,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'white',
  },
  textStart: {
    fontSize: 24,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
  textInfo: {
    fontSize: 18,
    marginLeft: width * 0.08,
    marginRight: width * 0.08,
    marginTop: height * 0.04,
    marginBottom: height * 0.04,
    textAlign: 'center',
    color: 'gray',
  },
  textDiv: {
    fontSize: 25,
    marginLeft: width * 0.08,
    marginRight: width * 0.08,
    marginTop: height * 0.08,
    marginBottom: height * 0.005,
    textAlign: 'center',
    color: 'gray',
  },
  textTerms: {
    fontSize: 20,
    marginLeft: width * 0.08,
    marginRight: width * 0.08,
    marginTop: height * 0.08,
    textAlign: 'center',
    color: '#2672FF',
  },
  buttonStyle: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.06,
    width: width * 0.8,
    borderRadius: 8,
    backgroundColor: '#2672FF',
    marginBottom: height * 0.01,
    marginTop: height * 0.01,
  },
  textButtons: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  icon: {
    position: 'absolute',
    left: width * 0.06,
  },
});
export default PassRecovery;
