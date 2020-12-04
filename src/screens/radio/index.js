import React, { useState, useEffect } from 'react';
import {
  StyleSheet, View, Text, FlatList, Dimensions, KeyboardAvoidingView, SafeAreaView, ScrollView
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button, Icon } from 'react-native-elements';
import AudioComponent from '../../components/Audio';
// import InputBasic from '../../components/InputBasic/inputBasic';
import { Send, LoadMessages } from './actionCreator';

const { height, width } = Dimensions.get('screen');

const Radio = () => {
  const dispatch = useDispatch();
  const radioState = useSelector((state) => state.reducerRadio);
  const profile = useSelector((state) => state.reducerProfile);
  const [input, setInput] = useState({
    message: '',
  });
  const { messages } = radioState;
  useEffect(async () => {
    dispatch(LoadMessages());
  }, []);

  console.log('mensaje', messages);
  const { uid, user } = profile;
  const { message } = input;
  const renderItem = ({ item }) => (
    item.uid === uid
      ? <ItemUsuario usuario={item.name} mensaje={item.message} />
      : <ItemInvitado usuario={item.name} mensaje={item.message} color={item.color} />
  );
  const ItemUsuario = ({ mensaje }) => (
    <View style={styles.itemUsuario}>
      <Text style={styles.mensajeUsuario}>{mensaje}</Text>
    </View>
  );
  const ItemInvitado = ({ usuario, mensaje, color }) => (
    <View style={styles.ItemInvitado}>
      <Text style={styles.titleInvitado(color)}>
        {usuario}
        {' '}
        :
        {' '}
      </Text>
      <Text style={styles.mensajeInvitado}>{mensaje}</Text>
    </View>
  );
  const sendFunction = () => {
    dispatch(Send(message, user.userName, uid));
    setInput({ ...input, message: '' });
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f22' }}>
      <ScrollView style={styles.container}>
        <View style={{ height: height * 0.15, width }}>
          <AudioComponent
            id="radio"
            link="http://64.37.50.226:8006/stream"
            radio
            size={70}
          />
        </View>
        <Text style={styles.titulo}>Chat KLK Radio</Text>
        <View style={styles.chatContainer}>
          <FlatList
            inverted
            data={messages}
            renderItem={renderItem}
            keyExtractor={(item) => item.time}
          />
        </View>
        <Input
          value={message}
          placeholder="Escribe tu mensaje"
          containerStyle={styles.input}
          underlineColorAndroid="#A7A8AB"
          onChangeText={(text) => setInput({ ...input, message: text })}
          rightIcon={(
            <Button
              raised
              onPress={() => sendFunction()}
              buttonStyle={styles.sendButton}
              icon={
                <Icon name="send" type="material-community" color="white" size={30} />
                 }
            />
            )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 29,
    height,
    width,
    backgroundColor: '#ffffff',
  },
  avoidingStyle: {
    height: height * 0.3,
    width,

  },
  titulo: {
    fontSize: 15,
    margin: 10,
    paddingVertical: 10,
    fontWeight: 'bold',
    borderColor: 'black',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  inputContainer: {
    alignItems: 'center',
    backgroundColor: '#A7A8AB',
    flexDirection: 'row',
    paddingHorizontal: width * 0.01,
    borderRadius: 50,
    height: height * 0.06,
    width: width * 0.94,
    shadowColor: 'rgba(0,0,0, .4)',
    shadowOffset: { height: 2, width: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 4,
  },
  sendButton: {
    height: height * 0.05,
    width: width * 0.11,
    borderRadius: 50,
    backgroundColor: '#f22',
  },
  input: {
    height: height * 0.07,
    alignSelf: 'center',
    width: width * 0.75,
    backgroundColor: '#A7A8AB',
    borderRadius: 30,
  },
  chatContainer: {
    paddingTop: 15,
    borderRadius: 40,
    height: height * 0.59,
    width,
    backgroundColor: '#F7F7F7',
  },
  itemUsuario: {
    alignSelf: 'center',
    alignItems: 'flex-end',
    margin: 10,
    height: height * 0.04,
    width: width * 0.9,
  },
  titleUsuario: {
    fontSize: 15,
  },
  mensajeUsuario: {
    padding: 12,
    borderRadius: 50,
    backgroundColor: '#2672FF',
    fontSize: 15,
    color: '#FFFFFF',
    borderBottomRightRadius: 0,
  },
  ItemInvitado: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    margin: 10,
    padding: 2,
    height: height * 0.04,
  },
  titleInvitado: (color) => ({
    fontSize: 15,
    textAlign: 'left',
    color,
  }),
  mensajeInvitado: {
    fontSize: 15,
    color: 'black',
  },
});

export default Radio;
