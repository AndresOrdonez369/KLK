import React, { useState } from 'react';
import {
  StyleSheet, View, Text, FlatList, Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button, Icon } from 'react-native-elements';
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
  const { uid } = profile;
  const { message } = input;
  const renderItem = ({ item }) => (
    item.uid === 'JuanMa'
      ? <ItemUsuario usuario={item.uid} mensaje={item.mensaje} />
      : <ItemInvitado usuario={item.uid} mensaje={item.mensaje} color={item.color}/>
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
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Chat KLK Radio</Text>
      <View style={styles.chatContainer}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.hora}
        />
      </View>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Escribe tu mensaje"
          containerStyle={styles.input}
          underlineColorAndroid="#A7A8AB"
          onChangeText={(text) => setInput({ ...input, message: text })}
        />
        <Button
          raised
          onPress={() => dispatch(Send(message))}
          buttonStyle={styles.sendButton}
          icon={
            <Icon name="send" type="material-community" color="white" size={30} />
      }
        />
      </View>
    </View>
  );
};
const DATA = [
  {
    uid: 'JuanMa',
    mensaje: 'Hola!',
    hora: '12:30',
  },
  {
    uid: 'Pedro',
    mensaje: 'Hola a todos',
    hora: '12:31',
    color: 'red',
  },
  {
    uid: 'JuanMa',
    mensaje: 'Que tal vas?',
    hora: '12:32',
  },
  {
    uid: 'Pedro',
    mensaje: 'Bien y tu?',
    hora: '12:33',
    color: 'red',
  },
  {
    uid: 'Jaime',
    mensaje: 'Que tal vas?',
    hora: '12:34',
    color: 'green',
  }, {
    uid: 'Chucho',
    mensaje: 'Hola',
    hora: '12:35',
    color: 'blue',
  },
  {
    uid: 'JuanMa',
    mensaje: 'Que tal vas?',
    hora: '12:36',
  },
  {
    uid: 'Pedro',
    mensaje: 'Que tal vas jaime?',
    hora: '12:37',
    color: 'red',
  }, {
    uid: 'Polo Polo',
    mensaje: 'Hola',
    hora: '12:38',
  },
  {
    uid: 'JuanMa',
    mensaje: 'Que tal vas?',
    hora: '12:39',
  },
];
const styles = StyleSheet.create({
  container: {
    height: height * 0.9,
    backgroundColor: '#F7F7F7',
    marginTop: height * 0.05,
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
    position: 'absolute',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: height * 0.83,
    backgroundColor: '#A7A8AB',
    flexDirection: 'row',
    paddingHorizontal: width * 0.03,
    borderRadius: 50,
    height: height * 0.06,
    width: width * 0.94,
    marginBottom: 5,
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
    alignSelf: 'center',
    marginTop: 10,
    width: width * 0.75,
  },
  chatContainer: {
    paddingTop: 15,
    borderRadius: 40,
    paddingBottom: height * 0.1,
    height: height * 0.85,
    width: '100%',
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
