import { Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('screen');

export default styles = StyleSheet.create({
    container: {
        height,
        width,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },  
    logo: {
        marginTop: height * 0.02, 
        marginBottom: height * 0.085, 
        height: height * 0.2,
        width: width * 0.35,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textPass: {
        fontSize: 16,
        alignSelf: 'flex-start',
        marginLeft:width * 0.1,
        marginRight:width * 0.1,
        marginTop: height*-0.01,
        marginBottom: height*0.02,
        color:"#2672FF"
    },
    textLogin: {
        fontSize: 18,
        marginTop: height*0.05,       
        color:"#2672FF"
    },  
    buttonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        height: height * 0.06,
        width: width * 0.8,
        borderRadius: 8,
        marginBottom: height*0.01,
        backgroundColor: '#2672FF',
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 2, width: 2 },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 4,
    },
    socialStyle: {      
        height: height * 0.06,
        width: width * 0.8,
        borderRadius: 8,
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 2, width: 2 },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 4,
    },
    textButtons:{
        color:"white",
        fontSize:14,
        fontWeight: "bold",
    },  
});
    