import React, { useState } from 'react';
import {
  View, Text, Image, Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SocialIcon } from 'react-native-elements';
import * as GoogleSignIn from 'expo-google-sign-in';
import InputBasic from '../../components/InputBasic/inputBasic';
import ButtonBasic from '../../components/ButtonBasic/ButtonBasic';
import AlertMessage from '../../components/AlertMessage';
import Logo from '../../../assets/logo.png';
import { loginEmailAndPassword } from './actionCreator';
import styles from './styles';
import firebase from '../../../firebase';
import checkErrorType from './helperFirebaseError';

const Login = () => {
  const { navigate } = useNavigation();
  // react-redux
  const dispatch = useDispatch();
  const state = useSelector((sta) => sta.reducerLogin);
  const { error, message } = state;
  // useState
  const [validation, setValidation] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    message: 'Hubo un error',
  });
  const [input, setInput] = useState({
    email: '',
    password: '',
  });
  const { email, password } = input;

  const syncUserWithStateAsync = async () => {
    const { user } = await GoogleSignIn.signInSilentlyAsync();
    await firebase
      .firestore()
      .collection('prueba')
      .add({
        user1: JSON.stringify(user),
        user2: JSON.stringify(user.email),
        prueba1: JSON.stringify(user.GoogleIdentity),
      });
    /*     inputRegistry({ prop: 'email', value: user.user.email });
    inputRegistry({ prop: 'name', value: user.user.name }); */
    navigate('registry');
  };
  const signInAsync = async () => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      await firebase
        .firestore()
        .collection('prueba')
        .add({
          user0: JSON.stringify(user),
          user2: JSON.stringify(user.email),
          prueba2: JSON.stringify(user.GoogleIdentity),
        });
      const respuesta = await GoogleSignIn.getCurrentUserAsync();
      await firebase
        .firestore()
        .collection('prueba')
        .add({
          prueba1: JSON.stringify(respuesta),
        });
      if (type === 'success') {
        syncUserWithStateAsync();
      }
    } catch ({ mess }) {
      Alert.alert('login: askForPlayServicesAsync:', mess);
      await firebase.firestore().collection('prueba').add({ error: 'entre al error signInAsync' });
    }
  };
  // loginEaP
  const logInEaP = async (Email, Password, val) => {
    if (Email.trim() === '' || Password.trim() === '') setAlert({ show: true, message: 'No pueden haber campos vacíos' });
    if (val) setAlert({ show: true, message: 'Ingresaste información incorrecta en algún campo' });
    if (error === false && Email.trim() !== '' && Password.trim() !== '') {
      await dispatch(loginEmailAndPassword(Email, Password));
    }
    if (error) setAlert({ show: true, message: checkErrorType(message) });
  };
  // login fb
  const loginFacebook = () => {
    console.log('loginfb');
  };
  // login google
  const loginGoogle = async () => {
    try {
      signInAsync();
    } catch (e) {
      Alert.alert('loginGoogle:', JSON.stringify(e));
    }
  };
  // validate
  const validate = (value) => {
    if (value !== undefined) setValidation(true); else setValidation(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'silver' }}>
      <View style={styles.container}>
        <Image source={Logo} style={styles.logo} />
        <InputBasic
          keyboardType="email-address"
          placeholder="Correo electrónico"
          validation="email"
          value={email}
          changeText={(text, err) => {
            setInput({ ...input, email: text });
            validate(err);
          }}
        />
        <InputBasic
          placeholder="Contraseña"
          validation="password"
          value={password}
          changeText={(text, err) => {
            setInput({ ...input, password: text });
            validate(err);
          }}
          secureTextEntry
        />
        {alert.show && <AlertMessage message={alert.message} />}
        <Text style={styles.textPass(alert.show)} onPress={() => navigate('PasswordRecovery')}>
          Olvidé mi contraseña
        </Text>
        <ButtonBasic
          text="Iniciar sesión"
          buttonStyle={styles.buttonStyle}
          textStyle={styles.textButtons}
          onPress={() => logInEaP(email, password, validation)}
        />
        <SocialIcon
          title="Iniciar con Facebook"
          button
          type="facebook"
          style={styles.socialStyle}
          fontStyle={styles.textButtons}
          onPress={() => loginFacebook()}
        />
        <SocialIcon
          title="Iniciar con Google"
          button
          type="google"
          style={styles.socialStyle}
          fontStyle={styles.textButtons}
          onPress={() => loginGoogle()}
        />
        <Text style={styles.textLogin} onPress={() => navigate('Registry')}>
          ¿Aún no tienes cuenta?
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Login;
