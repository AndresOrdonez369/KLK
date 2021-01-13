import React, { useState, useEffect } from 'react';
import {
  Dimensions, StyleSheet, View, FlatList, Platform, Text, ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SearchBar } from 'react-native-elements';
import SimpleAvatar from '../Avatar/SimpleAvatar';
import { cleanSearch, searcherFirestore } from '../../screens/friends/actionCreator';

const { height, width } = Dimensions.get('screen');

const SearchResult = ({ route }) => {
  // state
  const [loadingOverlay, setLoadingOverlay] = useState(false);
  const [search, setSearch] = useState('');

  // redux
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.reducerFriends);
  const {
    error, message, searchResult,
  } = friends;

  // navigation
  const { navigate } = useNavigation();
  const { str } = route.params;

  // fnc
  useEffect(() => {
    setLoadingOverlay(true);
    if (str !== '') dispatch(searcherFirestore(str));
    setLoadingOverlay(false);
  }, []);
  const doSearch = async (string) => {
    if (string.length > 0) {
      dispatch(cleanSearch());
      setLoadingOverlay(true);
      await dispatch(searcherFirestore(string));
      setLoadingOverlay(false);
    }
  };
  const goSearch = (uid, actualScreen) => {
    navigate('AnotherProfile', { uid, actualScreen });
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
        onPress={() => goSearch(String(uid), actualScreen)}
      />
    );
  };
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
          keyExtractor={(item) => item.uid}
        />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.centeredViewOverlay}>
        {overlayContent}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f22',
  },
  centeredViewOverlay: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
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
  headerContainer: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    flexWrap: 'wrap',
    fontSize: 18,
    color: '#2F4575',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  overlayContent: {
    alignItems: 'flex-start',
  },
});

export default SearchResult;
