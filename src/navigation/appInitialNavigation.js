import React, { useEffect, useState } from 'react';
import {
  View, Text, Dimensions, StyleSheet,
} from 'react-native';
import { Overlay, Button, Icon } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import PrincipalFlow from './principalFlow';
import Login from '../screens/login';
import PasswordRecovery from '../screens/passwordRecovery';
import Registry from '../screens/registry';
import { fetchUserData } from '../screens/profile/actionCreator';
import firebase from '../../firebase';

const Stack = createStackNavigator();

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
  overlayStyle: {
    width: width * 0.8,
    height: height * 0.45,
    borderRadius: 20,
  },
  overlayView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayText: {
    fontSize: height * 0.03,
    textAlign: 'center',
    color: '#00000090',
  },
  overlayButton: {
    width: width * 0.3,
    borderRadius: 20,
    backgroundColor: '#205DD0',
    margin: height * 0.03,
  },
});

function AuthStack() {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Registry" component={Registry} />
      <Stack.Screen name="PasswordRecovery" component={PasswordRecovery} />
      <Stack.Screen name="PrincipalFlow" component={PrincipalFlow} />
    </Stack.Navigator>
  );
}
function LoggedStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="PrincipalFlow" component={PrincipalFlow} />
    </Stack.Navigator>
  );
}
const AppInitialNavigation = () => {
  // state
  const [logged, setLogged] = useState(false);
  const [verified, setVerified] = useState(false);

  const dispatch = useDispatch();
  // authChecker
  useEffect(() => {
    const authState = () => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          if (user.emailVerified) {
            setLogged(true);
            setVerified(true);
            dispatch(fetchUserData());
          } else {
            setLogged(true);
            setVerified(false);
            user.sendEmailVerification();
          }
        } else {
          setLogged(false);
          setVerified(false);
        }
      });
    };
    authState();
  }, []);
  // EmailVerification
  const EmailVerification = () => (
    <Overlay
      isVisible
      windowBackgroundColor="rgba(0,0,0,.5)"
      overlayBackgroundColor="transparent"
      overlayStyle={styles.overlayStyle}
    >
      <View style={styles.overlayView}>
        <Icon name="email" type="material-community" size={width * 0.35} color="#205DD0" />
        <Text style={styles.overlayText}>
          Revisa tu correo electrónico, hemos enviado un enlace para verificar tu cuenta.
        </Text>
        <Button
          title="OK"
          onPress={() => firebase.auth().signOut()}
          buttonStyle={styles.overlayButton}
        />
      </View>
    </Overlay>
  );
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {(logged === true && verified === false) && <Stack.Screen name="VerificationEmail" component={EmailVerification} />}
        {(logged === false && verified === false) ? (<Stack.Screen name="Auth" component={AuthStack} />)
          : (<Stack.Screen name="PrincipalFlow" component={LoggedStack} />)}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppInitialNavigation;
