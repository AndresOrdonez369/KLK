import React, { useState } from 'react';
import {
  Dimensions, StyleSheet, View, Text, Image, KeyboardAvoidingView, Linking, TouchableHighlight,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { register } from './actionCreator';
import checkErrorType from './helperFirebaseError';
import InputBasic from '../../components/InputBasic/inputBasic';
import ButtonBasic from '../../components/ButtonBasic/ButtonBasic';
import AlertMessage from '../../components/AlertMessage';
import Loader from '../../components/Loader';
import Logo from '../../../assets/logo.png';

const { height, width } = Dimensions.get('screen');

const Registry = () => {
  // redux
  const dispatch = useDispatch();
  const regitryState = useSelector((state) => state.reducerRegistry);
  const { error, errorCode } = regitryState;
  // state
  const [isLoading, setIsLoading] = useState(false);
  const [validation, setValidation] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    message: 'Hubo un error',
  });
  const [input, setInput] = useState({
    email: '',
    name: '',
    userName: '',
    password: '',
  });
  const {
    email, password, name, userName,
  } = input;
  // fnc
  // eslint-disable-next-line no-underscore-dangle
  const _handleOpenWithLinking = () => {
    Linking.openURL('https://klkmessenger.norterecords.com/');
  };
  const { navigate } = useNavigation();
  const validate = (value) => {
    if (value !== undefined) setValidation(true); else setValidation(false);
  };
  const checkEmptyInputs = (Email, Password, Name, UserName) => {
    if (Email.trim() === '' || Password.trim() === ''
         || Name.trim() === '' || UserName.trim() === '') return true;
    return false;
  };
  const pressRegistry = async (Email, Password, Name, UserName, err, ErrorCode, val) => {
    if (checkEmptyInputs(Email, Password, Name, UserName)) setAlert({ show: true, message: 'No pueden haber campos vacíos' });
    if (val) setAlert({ show: true, message: 'Ingresaste información incorrecta en algún campo' });
    if (val === false && !checkEmptyInputs(Email, Password, Name, UserName)) {
      setIsLoading(true);
      await dispatch(register(Email, Password, Name, UserName));
      setIsLoading(false);
    }
    if (err) setAlert({ show: true, message: checkErrorType(ErrorCode) });
  };

  if (isLoading) return <Loader message="Registrando..." />;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'silver' }}>
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <View style={styles.icon}>
            <Icon
              name="arrow-left"
              type="font-awesome"
              onPress={() => navigate('Login')}
              color="#f22"
              size={35}
            />
          </View>
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
            placeholder="Nombre completo"
            validation="name"
            value={name}
            changeText={(text, err) => {
              setInput({ ...input, name: text });
              validate(err);
            }}
          />
          <InputBasic
            placeholder="Nombre de usuario"
            validation="name"
            value={userName}
            changeText={(text, err) => {
              setInput({ ...input, userName: text });
              validate(err);
            }}
          />
          <InputBasic
            secureTextEntry
            placeholder="Contraseña"
            validation="password"
            value={password}
            changeText={(text, err) => {
              setInput({ ...input, password: text });
              validate(err);
            }}
          />
          {alert.show && <AlertMessage message={alert.message} />}
          <ButtonBasic
            text="Registrarse"
            buttonStyle={styles.buttonStyle}
            textStyle={styles.textButtons}
            onPress={() => pressRegistry(
              email, password, name, userName, error, errorCode, validation,
            )}
          />
          <TouchableHighlight onPress={_handleOpenWithLinking} underlayColor="#ffc4c4">
            <Text style={styles.textTerms}>
              Al registrarte aceptas nuestras Condiciones y Política de privacidad.
            </Text>
          </TouchableHighlight>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height,
    width,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'white',
  },
  logo: {
    height: height * 0.2,
    width: width * 0.35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTerms: {
    fontSize: height * 0.02,
    marginLeft: width * 0.08,
    marginRight: width * 0.08,
    marginBottom: height * 0.03,
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
export default Registry;
