import React, { useState } from 'react';
import {
  Dimensions, StyleSheet, View, FlatList,
} from 'react-native';
import { Button, SearchBar } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import FollowAvatar from '../../components/Avatar/FollowAvatar';

const { height, width } = Dimensions.get('screen');

const Following = [
  {
    urlImage: 'https://www.eltiempo.com/files/article_multimedia/uploads/2019/11/07/5dc434e900e5f.jpeg',
    name: 'Sara Sofia Zarama Cifuentes',
    date: '@Saritazama',

  },
  {
    urlImage: 'https://assets.afcdn.com/story/20160810/951677_w800h720cx362cy320.jpg',
    name: 'Luis Rivera Hernandez',
    date: '@Luisriveres',
  },
  {
    urlImage: 'https://pbs.twimg.com/profile_images/549851078880022528/8X7WyNT9_400x400.jpeg',
    name: 'Sergio Hernandez Contreras',
    date: '@sergiouyh',
  },
  {
    urlImage: 'https://scontent.fclo8-1.fna.fbcdn.net/v/t1.0-1/p720x720/48362502_2498331116876254_6402442224126132224_n.jpg?_nc_cat=105&ccb=2&_nc_sid=dbb9e7&_nc_ohc=O3ivFCF4SYcAX8jVc62&_nc_ht=scontent.fclo8-1.fna&tp=6&oh=7e89b63e55d3f7250b8d4762ec606cba&oe=5FB84A0A',
    name: 'Juan Camilo Delgado MOA',
    date: '@moamusic',
  },
  {
    urlImage: 'https://www.elcomercio.com/files/article_main/uploads/2019/09/23/5d8904a49a8b2.jpeg',
    name: 'Jose Alvaro Osorio Balvin',
    date: '@jbalvin',
  },
];
const Followers = [
  {
    urlImage: 'https://i.pinimg.com/564x/f1/40/4c/f1404c87f540b80b5fcf766e4c1f567d.jpg',
    name: 'Valentina Ruiz Carmona ',
    date: '@valecarmon',
  },
  {
    urlImage: 'https://www.spanishjournal.com/wp-content/uploads/2019/09/091919entertainment.jpg',
    name: 'Austin Agustin Santos',
    date: '@arcangelbaby',
  },
  {
    urlImage: 'https://eslamoda.com/wp-content/uploads/sites/2/2015/11/fashion-selfie.jpg',
    name: 'Luisa De la cruz Gonzales',
    date: '@luvalecruz',
  },
  {
    urlImage: 'https://i.pinimg.com/564x/f1/40/4c/f1404c87f540b80b5fcf766e4c1f567d.jpg',
    name: 'Dylan Miguel Fernandez Gonzales',
    date: '@dylanilan',
  },
  {
    urlImage: 'https://i.pinimg.com/originals/21/09/02/210902457232e54775bc239033c4a88e.png',
    name: 'Fernando Andrés Delgado',
    date: '@ferandres',
  }];
const Friends = () => {
  // state
  const [renderData, setRenderData] = useState(Followers);
  const [search, setSearch] = useState('');
  // fnc
  const updateSearch = (searching) => {
    setSearch(searching);
  };
  const renderFollow = ({ item }) => (
    <FollowAvatar
      urlImage={item.urlImage}
      name={item.name}
      date={item.date}
    />
  );
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <FlatList
          data={renderData}
          ListHeaderComponent={(
            <View style={styles.headerContainer}>
              <SearchBar
                placeholder="Busca el nombre del usuario..."
                onChangeText={(text) => updateSearch(text)}
                value={search}
                containerStyle={styles.containerSearch}
                inputContainerStyle={styles.search}
                cancelIcon
                showCancel
                lightTheme
                onCancel={() => setSearch('')}
              />
              <View style={styles.iconContainer}>
                <Button
                  title="198 seguidores"
                  buttonStyle={styles.buttonRender(renderData === Followers)}
                  onPress={() => setRenderData(Followers)}
                  titleStyle={styles.titleButton}
                />
                <Button
                  title="220 seguidos"
                  buttonStyle={styles.buttonRender(renderData === Following)}
                  onPress={() => setRenderData(Following)}
                  titleStyle={styles.titleButton}
                />
              </View>
            </View>
           )}
          renderItem={renderFollow}
          keyExtractor={(item) => item.name}
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
    justifyContent: 'center',
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
  },
  search: {
    backgroundColor: 'white',
    borderBottomWidth: 2,
    borderBottomColor: '#f22',
  },
});

export default Friends;
