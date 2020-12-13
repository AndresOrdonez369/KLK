import React, { useState, useEffect } from 'react';
import {
  Dimensions, StyleSheet, View, Text, FlatList, ScrollView, BackHandler,
} from 'react-native';
import {
  Icon, Input, Button,
} from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import CommentAvatar from '../../components/Avatar/CommentAvatar';
import { submitComment, getComments, updateCleanComments } from './actionCreator';
import Post from '../../components/FeedPost';

const { height, width } = Dimensions.get('screen');

const Comments = ({ route }) => {
  const [comment, setComment] = useState('');
  const [getPostFlag, setGetPostFlag] = useState(true);
  const profile = useSelector((state) => state.reducerProfile);
  const commentReducer = useSelector((state) => state.reducerComments);
  const { comments } = commentReducer;
  const { uid, user, imageURL } = profile;
  const { navigate } = useNavigation();
  const {
    postObject, screen,
  } = route.params;
  const dispatch = useDispatch();

  const onPressFc = async () => {
    dispatch(updateCleanComments());
    await navigate(screen);
  };

  useEffect(() => {
    const getInComments = async () => {
      if (getPostFlag && comments.length === 0) {
        await dispatch(getComments(postObject.authorId, postObject.pid));
      }
    };

    getInComments();
    setGetPostFlag(false);
  }, [postObject, comments, getPostFlag]);

  const backAction = () => {
    onPressFc();
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  const renderComment = ({ item }) => (
    <CommentAvatar
      url={item.url}
      name={item.name}
      comment={item.comment}
      hour={item.hour}
    />
  );

  const submit = () => {
    dispatch(submitComment(comment, uid, user.name, postObject.authorId, postObject.pid, imageURL));
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
            onPress={() => onPressFc()}
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
            data={comments}
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
const styles = StyleSheet.create({
  container: {
    height,
    width,
    backgroundColor: '#ffffff',
  },
  header: {
    height: height * 0.05,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
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
    marginTop: height * 0.005,
    height: height * 0.06,
    alignSelf: 'center',
    width: width * 0.95,
    backgroundColor: '#efefef',
    borderRadius: 20,
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
