import React, { useState, useEffect } from 'react';
import {
  Dimensions, StyleSheet, View, Text, FlatList,
} from 'react-native';
import {
  Icon, Input, Avatar, Overlay, Button,
} from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import CommentAvatar from '../../components/Avatar/CommentAvatar';
import { submitComment, getComments } from './actionCreator';
import FeedPost from '../../components/FeedPost';

const { height, width } = Dimensions.get('screen');

const Comments = ({ route }) => {
  console.log(route);
  const [comment, setComment] = useState('');
  const profile = useSelector((state) => state.reducerProfile);
  const commentReducer = useSelector((state) => state.reducerComments);
  const { post, comments } = commentReducer;
  const { uid, user, imageURL } = profile;
  const { navigate } = useNavigation();
  const { pid, authorID } = route.params;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getComments(authorID, pid));
  }, []);
  const renderComment = ({ item }) => (
    <CommentAvatar
      url={item.url}
      name={item.name}
      comment={item.comment}
    />
  );
  const submit = () => {
    if (comment.trim() === '') {
      console.log('Traer Modal');
    } else {
      dispatch(submitComment(comment, uid, user, imageURL, pid));
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f22' }}>
      <View style={styles.container}>
        <View>
          <FeedPost
            authorName={post.authorName}
            mensaje={post.mensaje}
            mediaLink={post.mediaLink}
            likes={post.likes}
            type={post.type}
            timestamp={post.timestamp}
            url={post.url}
            pid ={pid}
            authorId={authorID}
          />
        </View>
        <View style={styles.header}>
          <Icon
            name="arrow-left"
            type="font-awesome"
            iconStyle={styles.icon}
            onPress={() => navigate('Feed')}
          />
          <Text style={styles.title}>
            Comentarios
          </Text>
        </View>
        <FlatList
          data={DATA}
          renderItem={renderComment}
          keyExtractor={(item) => item.name}
        />
        <View style={styles.inputContainer}>
          <Input
            placeholder=" Escribe un comentario... "
            inputContainerStyle={styles.inputStyle}
            containerStyle={styles.input}
            style={styles.placeholder}
            onChange={(e) => setComment(e.nativeEvent.text)}
            value={comment}
          />
          <Button
            raised
            buttonStyle={styles.sendButton}
            onPress={() => submit()}
            icon={
              <Icon name="send" type="material-community" color="white" size={30} />
            }
          />
        </View>
      </View>
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
    height,
    width,
    backgroundColor: 'white',
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
