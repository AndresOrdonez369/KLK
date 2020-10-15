import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { uploadAudio, uploadImage, uploadVideo, submitPost } from './actionCreator';
import styles from './styles';
    
const Post = () => {
    //state
    const [body, setBody] = useState('');

    const { navigate } = useNavigation();
    const dispatch = useDispatch();
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'silver' }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Icon
                        name="arrow-left"
                        type='font-awesome'
                        onPress={() => navigate('Inicio')}
                        iconStyle={styles.icon}
                    />
                    <Text style={styles.title}> 
                        Crear publicación
                    </Text> 
                </View>
                {/*user component*/}
                <View style={styles.inputContainer}>
                    <Input
                        placeholder=' ¿Klk estás pensando?'
                        inputContainerStyle={styles.inputStyle}
                        containerStyle={styles.input}
                        onChange={(e) => setBody(e.nativeEvent.text)}
                        style={styles.placeholder}
                    />
                </View>
                <View style={styles.buttonsContainer}>
                    <View style={styles.iconContainer}>
                        <Icon
                            name="image"
                            type='ionicons'
                            size={30}
                            onPress={() => dispatch(uploadImage())}
                            iconStyle={styles.icons}
                        />
                        <Icon
                            name="video"
                            type='material-community'
                            size={30}
                            onPress={() => dispatch(uploadVideo())}
                            iconStyle={styles.icons}
                        />
                        <Icon
                            name="music-box"
                            type='material-community'
                            size={30}
                            onPress={() => dispatch(uploadAudio())}
                            iconStyle={styles.icons}
                        />
                    </View>
                    <Text
                        style={styles.submitStyle}
                        onPress={() => dispatch(submitPost(body))}
                    >Publicar</Text>
                </View>
            </View>
        </SafeAreaView>
        );
    }
    
export default Post;