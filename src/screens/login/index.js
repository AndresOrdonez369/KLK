import React, { PureComponent } from 'react';
import { Dimensions, StyleSheet, View, Text, Image } from 'react-native';
import InputBasic from '../../components/InputBasic/inputBasic';
import ButtonBasic from  '../../components/ButtonBasic/ButtonBasic'; 
import { SocialIcon } from 'react-native-elements'
import Logo from '../../../assets/logo.png';

const { height, width } = Dimensions.get('screen');
    
class Login extends PureComponent {
    
    render() {
        return (
            <View style={styles.container}>
                
                <Image source={Logo} style={styles.logo}/>
                <InputBasic 
                    placeholder="Correo electrónico" 
                />
                <InputBasic 
                    placeholder="Contraseña" 
                />
                <Text style={styles.textPass}>Olvidé mi contraseña</Text>
                <ButtonBasic text="Iniciar sesión" buttonStyle={styles.buttonStyle} textStyle={styles.textButtons}/>
                <SocialIcon
                    title='Iniciar con Facebook'
                    button
                    type='facebook'
                    style={styles.socialStyle}
                    ontStyle={styles.textButtons}
                />
                <SocialIcon
                    title='Iniciar con Google'
                    button
                    type='google'
                    style={styles.socialStyle}
                    fontStyle={styles.textButtons}
                />
                <Text style={styles.textLogin}>¿ Aún no tienes cuenta ?</Text>
                
                
                 
            </View>
        );
    }
}
    
const styles = StyleSheet.create({
    container: {
        height,
        width,
        alignItems: 'center',
        justifyContent: 'center',
    },
   
    logo: {
        marginTop: height * 0.02, 
        marginBottom: height * 0.09, 
        height: height * 0.2,
        width: width * 0.35,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textPass: {
        fontSize: 16,
        marginTop: height*-0.01,
        marginBottom: height*0.01,
        color:"#2672FF"
    },
    textLogin: {
        fontSize: 18,
        marginTop: height*0.12,
        
        color:"#2672FF"
    },  
    buttonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        height: height * 0.06,
        width: width * 0.8,
        borderRadius: 8,
        backgroundColor: '#2672FF',
      },
      socialStyle: {      
        height: height * 0.06,
        width: width * 0.8,
        borderRadius: 8,
      },
      textButtons:{
        color:"white",
        fontSize:14,
        fontWeight: "bold",
        },
      
});
    
export default Login;