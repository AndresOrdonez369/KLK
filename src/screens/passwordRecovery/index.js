import React, { useState } from 'react';
import {
  Dimensions, StyleSheet, View, Text,
} from 'react-native';
import InputBasic from '../../components/InputBasic/inputBasic';
import ButtonBasic from '../../components/ButtonBasic/ButtonBasic';

const { height, width } = Dimensions.get('screen');

const PassRecovery = () => {
  // state
  const [input, setInput] = useState({ user: '' });
  // recuperar contraseña
  const pressRecovery = (user) => {
    console.log(user);
  };
  return (
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
        changeText={(text, err) => setInput({ user: text })}
      />
      <ButtonBasic
        text="Enviar"
        buttonStyle={styles.buttonStyle}
        textStyle={styles.textButtons}
        onPress={() => pressRecovery(input.user)}
      />
      <Text style={styles.textDiv}>-----------------------o-----------------------</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height,
    width,
    alignItems: 'center',
    justifyContent: 'center',
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

});
export default PassRecovery;
