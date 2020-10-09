import React, { useState } from 'react';
import { Dimensions, StyleSheet, View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { register } from './actionCreator';
import checkErrorType from './helperFirebaseError';
import InputBasic from '../../components/InputBasic/inputBasic';
import ButtonBasic from  '../../components/ButtonBasic/ButtonBasic'; 
import Logo from '../../../assets/logo.png';

const { height, width } = Dimensions.get('screen');
    
const Registry = () => {
    //redux
    const dispatch = useDispatch();
    const regitryState = useSelector(state => state.reducerRegistry)
    const { error, errorCode } = regitryState;
    //state
    const [input, setInput] = useState({
        email: '',
        name: '',
        userName: '',
        password: ''
    });
    const { email, password, name, userName } = input;
    //Registrarse
    const checkEmptyInputs = (email, password, name, userName) => {
        if (email.trim() === '' || password.trim() === '' ||
         name.trim() === '' || userName.trim() === '') return true
        return false;
    }
    const pressRegistry = (email, password, name, userName, error, errorCode) => {
        if (checkEmptyInputs(email, password, name, userName)) return console.log('inputs vacíos');
        if (error) return console.log('error db', checkErrorType(errorCode));
        return dispatch(register(email, password, name, userName));
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
                    placeholder="Nombre completo"
                    validation="name"
                    value={name}
                    changeText={(text, err) => setInput({...input, name: text})}
                />
                <InputBasic 
                    placeholder="Nombre de usuario"
                    value={userName}
                    changeText={(text, err) => setInput({...input, userName: text})}
                />
                <InputBasic
                    secureTextEntry
                    placeholder="Contraseña"
                    validation="password"
                    value={password}
                    changeText={(text, err) => setInput({...input, password: text})}
                />
                <ButtonBasic
                    text="Registrarse"
                    buttonStyle={styles.buttonStyle}
                    textStyle={styles.textButtons}
                    onPress={() => pressRegistry(email, password, name, userName, error, errorCode)}
                />
                <Text style={styles.textTerms}>Al registrarte aceptas nuestras Condiciones y Política de privacidad. </Text>       
            </View>
        </SafeAreaView>
    );
}
    
const styles = StyleSheet.create({
    container: {
        height,
        width,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    logo: {
        marginTop: height * 0.05, 
        marginBottom: height * 0.05, 
        height: height * 0.2,
        width: width * 0.35,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textTerms: {
        fontSize: 20,
        marginLeft:width * 0.08,
        marginRight:width * 0.08,
        marginTop: height*0.03,
        textAlign: "center",
        color:"#2672FF",
    },  
    buttonStyle: {
        textAlign:'center',
        alignItems: 'center',
        justifyContent: 'center',
        height: height * 0.06,
        width: width * 0.8,
        borderRadius: 8,
        backgroundColor: '#2672FF',
        marginBottom: height*0.01,
        marginTop: height*0.01,
      },
    textButtons:{
        color:"white",
        fontSize:18,
        fontWeight: "bold",
        },
      
});
export default Registry;
