import React, { useState, useEffect } from 'react';
import {
  Dimensions, StyleSheet, View, Text, FlatList, ScrollView,
} from 'react-native';
import {
  Icon, Input, Avatar, Overlay, Button,
} from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import CommentAvatar from '../../components/Avatar/CommentAvatar';
import { submitComment, getComments } from './actionCreator';
import Post from '../../components/FeedPost';

const { height, width } = Dimensions.get('screen');

const Comments = ({ route }) => {
  const [comment, setComment] = useState('');
  const profile = useSelector((state) => state.reducerProfile);
  const commentReducer = useSelector((state) => state.reducerComments);
  const { comments } = commentReducer;
  console.log(comments, 'que llegaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!');

  const { uid, user, imageURL } = profile;
  const { navigate } = useNavigation();
  const {
    postObject, screen,
  } = route.params;
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(postObject.authorID, postObject.pid, 'esto que es lo que necesitaaaaaaaaaaaaamos');
    dispatch(getComments(postObject.authorID, postObject.pid));
  }, [postObject]);

  const renderComment = ({ item }) => (
    <CommentAvatar
      url={item.url}
      name={item.name}
      comment={item.comment}
    />
  );
  const submit = () => {
    dispatch(submitComment(comment, uid, user.name, imageURL, postObject.pid));
    console.log(postObject.authorID, postObject.pid, 'este es uno de los que nbecesitamos');
    dispatch(getComments(postObject.authorID, postObject.pid));
    setComment('');
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f22' }}>
      <ScrollView style={styles.container}>

        <View style={styles.header}>
          <Icon
            name="arrow-left"
            type="font-awesome"
            iconStyle={styles.icon}
            onPress={() => navigate(screen)}
          />
          <Text style={styles.title}>
            Comentarios
          </Text>
        </View>
        <View>
          <Post
            authorName={postObject.authorName}
            mensaje={postObject.mensaje}
            mediaLink={postObject.mediaLink}
            likes={postObject.likes}
            type={postObject.type}
            timestamp={postObject.timestamp}
            url={postObject.url}
            pid={postObject.pid}
            authorId={postObject.authorId}
            blockComment
          />
        </View>
        <View style={styles.chatContainer}>
          <FlatList
            data={DATA}
            renderItem={renderComment}
            keyExtractor={(item) => item.cid}
          />
        </View>
        <Input
          placeholder="Escribe tu comentario"
          containerStyle={styles.input}
          underlineColorAndroid="#A7A8AB"
          onChangeText={(text) => setComment(text)}
          value={comment}
          rightIcon={(
            <Button
              raised
              onPress={() => submit()}
              buttonStyle={styles.sendButton}
              icon={
                <Icon name="send" type="material-community" color="white" size={25} />
                 }
            />
            )}
        />

      </ScrollView>
    </SafeAreaView>
  );
};

const DATA = [
  {
    url: 'https://www.eltiempo.com/files/article_multimedia/uploads/2019/11/07/5dc434e900e5f.jpeg',
    name: 'Sara Sofia Zarama Cifuentes',
    comment: '@Saritazamaassssssssssssssssssssssssssssssssssdasdasdasdasdasd hola como estas',

  },
  {
    url: 'https://assets.afcdn.com/story/20160810/951677_w800h720cx362cy320.jpg',
    name: 'Luis Rivera Hernandez',
    comment: '@Luisriveres eres el mejor y no el peor papasito',
  },
  {
    url: 'https://pbs.twimg.com/profile_images/549851078880022528/8X7WyNT9_400x400.jpeg',
    name: 'Sergio Hernandez Contreras',
    comment: '@sergiouyh',
    cid: '1234',
  },
  {
    url: 'https://scontent.fclo8-1.fna.fbcdn.net/v/t1.0-1/p720x720/48362502_2498331116876254_6402442224126132224_n.jpg?_nc_cat=105&ccb=2&_nc_sid=dbb9e7&_nc_ohc=O3ivFCF4SYcAX8jVc62&_nc_ht=scontent.fclo8-1.fna&tp=6&oh=7e89b63e55d3f7250b8d4762ec606cba&oe=5FB84A0A',
    name: 'Juan Camilo Delgado MOA',
    comment: '@moamusic',
  },
  {
    url: 'https://www.elcomercio.com/files/article_main/uploads/2019/09/23/5d8904a49a8b2.jpeg',
    name: 'Jose Alvaro Osorio Balvin',
    comment: '@jbalvin',
  },
  {
    url: 'https://i.pinimg.com/564x/f1/40/4c/f1404c87f540b80b5fcf766e4c1f567d.jpg',
    name: 'Valentina Ruiz Carmona ',
    comment: '@valecarmon',
  },
  {
    url: 'https://i.pinimg.com/originals/21/09/02/210902457232e54775bc239033c4a88e.png',
    name: 'Fernando Andrés Delgado',
    comment: '@ferandres',
  }];
const styles = StyleSheet.create({
  container: {
    marginTop: 29,
    height,
    width,
    backgroundColor: '#ffffff',
  },
  header: {
    height: height * 0.05,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 1,
  },
  inputContainer: {
    position: 'absolute',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: height * 0.83,
    flexDirection: 'row',
    borderRadius: 50,
    height: height * 0.06,
    width: width * 0.94,

  },
  chatContainer: {
    paddingTop: 15,
    height: height * 0.28,
    width,
    backgroundColor: 'white',
  },
  sendButton: {
    height: height * 0.04,
    width: width * 0.10,
    borderRadius: 50,
    backgroundColor: '#f22',
  },
  input: {
    height: height * 0.06,
    alignSelf: 'center',
    width: width * 0.75,
    backgroundColor: '#efefef',
    borderRadius: 30,
  },
  title: {
    fontSize: height * 0.02,
    color: 'black',
  },
  icon: {
    color: '#f22',
    marginRight: 20,
    marginLeft: 8,
  },
  inputStyle: {
    flexDirection: 'row',
    height: height * 0.04,
    width: width * 0.6,
    marginTop: height * 0.004,
    marginBottom: height * 0.004,
    borderRadius: 115,
    backgroundColor: '#E6E6E6', // gainsboro
    borderWidth: 0.5,
    borderColor: 'gray',
  },
  placeholder: {
    alignSelf: 'flex-start',
  },
  buttonSubmit: {
    backgroundColor: '#f22',
    borderRadius: 20,
    width: width * 0.2,
    height: height * 0.2,
  },

});

export default Comments;
