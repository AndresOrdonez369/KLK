import React, { useState, useEffect } from 'react';
import {
  Dimensions, StyleSheet, View, FlatList, Platform, Text, ActivityIndicator,
} from 'react-native';
import { Button, SearchBar, Overlay } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { searcherFirestore, cleanSearch } from './actionCreator';
import SimpleAvatar from '../../components/Avatar/SimpleAvatar';
import FollowAvatar from '../../components/Avatar/FollowAvatar';

const { height, width } = Dimensions.get('screen');

const Friends = () => {
  // state
  const [renderData, setRenderData] = useState(Followers);
  const [buttonSelected, setButtonSelected] = useState('followers');
  const [showOverlay, setShowOverlay] = useState(false);
  const [loadingOverlay, setLoadingOverlay] = useState(false);
  const [search, setSearch] = useState('');

  // redux
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.reducerProfile);
  const friends = useSelector((state) => state.reducerFriends);
  const { error, message, searchResult } = friends;
  const { followers, following } = profile.user;

  const { navigate } = useNavigation();

  // data
  const Followers = followers ? Object.keys(followers).map((item) => ({
    uid: item,
    name: followers[item].name,
    userName: followers[item].userName,
    imageURL: followers[item].imageURL,
  })) : [];
  const Following = following ? Object.keys(following).map((item) => ({
    uid: item,
    name: following[item].name,
    userName: following[item].userName,
    imageURL: following[item].imageURL,
  })) : [];
  const follows = Following.length;
  const follower = Followers.length;

  // fnc
  useEffect(() => {
    setButtonSelected('followers');
    setRenderData(Followers);
  }, []);
  const doSearch = async (string) => {
    if (string.length > 0) {
      dispatch(cleanSearch());
      setShowOverlay(true);
      setLoadingOverlay(true);
      await dispatch(searcherFirestore(string));
      setLoadingOverlay(false);
    }
  };

  // components
  const renderAvatar = ({ item }) => {
    const {
      uid, name, imageURL, userName,
    } = item;
    const actualScreen = 'Panas';
    return (
      <SimpleAvatar
        size={height * 0.1}
        url={imageURL}
        name={name}
        date={`@${userName}`}
        onPress={() => navigate('AnotherProfile', { uid, actualScreen })}
      />
    );
  };
  const renderFollow = ({ item }) => {
    const {
      uid, name, imageURL, userName,
    } = item;
    const actualScreen = 'Panas';
    return (
      <FollowAvatar
        urlImage={imageURL}
        name={name}
        date={`@${userName}`}
        onPress={() => navigate('AnotherProfile', { uid, actualScreen })}
      />
    );
  };
  const header = (
    <View style={styles.headerContainer}>
      <SearchBar
        placeholder="Busca usuarios por su nick..."
        onChangeText={(text) => setSearch(text)}
        searchIcon={{
          color: '#f22',
          onPress: () => doSearch(search),
          size: styles.headerContainer.width * 0.08,
        }}
        value={search}
        containerStyle={styles.containerSearch}
        inputContainerStyle={styles.search}
        cancelIcon={Platform.OS === 'android'}
        showCancel={Platform.OS === 'ios'}
        lightTheme
        onCancel={() => setSearch('')}
      />
      <View style={styles.iconContainer}>
        <Button
          title={`${follower} seguidores`}
          buttonStyle={styles.buttonRender(buttonSelected === 'followers')}
          onPress={() => {
            setRenderData(Followers);
            setButtonSelected('followers');
          }}
          titleStyle={styles.titleButton}
        />
        <Button
          title={`${follows} seguidos`}
          buttonStyle={styles.buttonRender(buttonSelected === 'following')}
          onPress={() => {
            setRenderData(Following);
            setButtonSelected('following');
          }}
          titleStyle={styles.titleButton}
        />
      </View>
    </View>
  );
  let overlayContent;
  if (loadingOverlay) {
    overlayContent = (
      <ActivityIndicator size="large" color="#f22" />
    );
  }
  if (error) {
    overlayContent = (
      <Text style={styles.info}>{message}</Text>
    );
  }
  if (searchResult.length < 1) {
    overlayContent = (
      <Text style={styles.info}>No se encontraron resultados para tu búsqueda</Text>
    );
  } else {
    overlayContent = (
      <View styles={styles.overlayContent}>
        <SearchBar
          placeholder="Busca usuarios por su nick..."
          onChangeText={(text) => setSearch(text)}
          searchIcon={{
            color: '#f22',
            onPress: () => doSearch(search),
            size: styles.headerContainer.width * 0.08,
          }}
          value={search}
          containerStyle={styles.containerSearch}
          inputContainerStyle={styles.search}
          cancelIcon={Platform.OS === 'android'}
          showCancel={Platform.OS === 'ios'}
          lightTheme
          onCancel={() => setSearch('')}
        />
        <FlatList
          data={searchResult}
          renderItem={renderAvatar}
          keyExtractor={(item) => item.name}
        />
      </View>
    );
  }

  if (buttonSelected === 'followers' && Followers.length < 1) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {header}
          <View style={styles.centeredView}>
            <Text style={styles.info}>No tienes seguidores de momento</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  } if (buttonSelected === 'following' && Following.length < 1) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {header}
          <View style={styles.centeredView}>
            <Text style={styles.info}>
              No estás siguiendo a nadie, ¡encuentra a tus amigos en el buscador!
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {showOverlay
        && (
          <Overlay
            isVisible={showOverlay}
            style={styles.overlay}
            onBackdropPress={() => setShowOverlay(false)}
          >
            <View style={styles.centeredViewOverlay}>
              {overlayContent}
            </View>
          </Overlay>
        )}
        <FlatList
          data={renderData}
          ListHeaderComponent={header}
          renderItem={renderFollow}
          keyExtractor={(item) => item.uid}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f22',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  headerContainer: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  buttonRender: (value) => ({
    backgroundColor: 'transparent',
    borderBottomWidth: value ? 2 : 0,
    borderBottomColor: 'grey',
    margin: 5,
    height: height * 0.05,
  }),
  iconContainer: {
    flexDirection: 'row',
    height: height * 0.05 + 6,
    width,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    justifyContent: 'center',
  },
  titleButton: {
    color: 'black',
  },
  containerSearch: {
    width,
    backgroundColor: 'transparent',
    borderColor: '#f22',
    height: 65,
  },
  search: {
    backgroundColor: 'white',
    borderBottomWidth: 2,
    borderBottomColor: '#f22',
  },
  info: {
    flexWrap: 'wrap',
    fontSize: 18,
    color: '#2F4575',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  overlay: {
    backgroundColor: 'white',
    alignItems: 'center',
    width,
    justifyContent: 'flex-end',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  centeredViewOverlay: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayContent: {
    alignItems: 'flex-start',
  },
});

export default Friends;
