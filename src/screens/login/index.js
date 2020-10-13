import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import InputBasic from '../../components/InputBasic/inputBasic';
import ButtonBasic from  '../../components/ButtonBasic/ButtonBasic'; 
import { SocialIcon } from 'react-native-elements'
import Logo from '../../../assets/logo.png';
import { loginEmailAndPassword } from './actionCreator';
import styles from './styles';
    
const Login = () => {
    const { navigate } = useNavigation();
    //react-redux
    const dispatch = useDispatch();
    const state = useSelector(state => state.reducerLogin);
    const { error } = state;
    //useState
    const [input, setInput] = useState({
        email: '',
        password: ''
    });
    const { email, password } = input;
    // loginEaP
    const logInEaP = async (email, password) => {
        await dispatch(loginEmailAndPassword(email, password));
        if (error === false && email.trim() !== '' && email.trim() !== '' ) {
        }
    }
    // login fb
    const loginFacebook = () => {
        console.log('loginfb');
    }
    // login google
    const loginGoogle = () => {
        console.log('loginGoogle')
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'silver' }}>
            <View style={styles.container}>                
                <Image source={Logo} style={styles.logo}/>
                <InputBasic
                    keyboardType="email-address"
                    placeholder="Correo electrónico"
                    validation="email"
                    value={email}
                    changeText={(text, err) => setInput({...input, email: text})}
                />
                <InputBasic 
                    placeholder="Contraseña"
                    validation="password"
                    value={password}
                    changeText={(text, err) => setInput({...input, password: text})}
                    secureTextEntry
                />
                <Text style={styles.textPass} onPress={() => navigate('PasswordRecovery')}>
                    Olvidé mi contraseña
                </Text>
                <ButtonBasic
                    text="Iniciar sesión"
                    buttonStyle={styles.buttonStyle}
                    textStyle={styles.textButtons}
                    onPress={() => logInEaP(email, password)}
                />
                <SocialIcon
                    title='Iniciar con Facebook'
                    button
                    type='facebook'
                    style={styles.socialStyle}
                    fontStyle={styles.textButtons}
                    onPress={() => loginFacebook()}
                />
                <SocialIcon
                    title='Iniciar con Google'
                    button
                    type='google'
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
}

export default Login;