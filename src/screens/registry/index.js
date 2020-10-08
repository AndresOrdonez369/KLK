import React, { PureComponent } from 'react';
import { Dimensions, StyleSheet, View, Text, Image } from 'react-native';
import InputBasic from '../../components/InputBasic/inputBasic';
import ButtonBasic from  '../../components/ButtonBasic/ButtonBasic'; 
import Logo from '../../../assets/logo.png';

const { height, width } = Dimensions.get('screen');
    
class Registry extends PureComponent {
    
    render() {
        return (
            <View style={styles.container}>
                
                <Image source={Logo} style={styles.logo}/>
                <InputBasic 
                    placeholder="Correo electrónico" 
                />
                <InputBasic 
                    placeholder="Nombre completo" 
                />
                <InputBasic 
                    placeholder="Nombre de usuario" 
                /><InputBasic 
                    placeholder="Contraseña" 
                />
                <ButtonBasic text="Registrarse" buttonStyle={styles.buttonStyle} textStyle={styles.textButtons}/>
                <Text style={styles.textTerms}>Al registrarte aceptas nuestras Condiciones y Politica de privacidad. </Text>
                
                
                 
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
