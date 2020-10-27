import React, { PureComponent } from 'react';
import { Dimensions, StyleSheet, View, Text, FlatList, StatusBar} from 'react-native';
import FollowAvatar from '../../components/Avatar/FollowAvatar';
    
const { height, width } = Dimensions.get('screen');
const renderFollow = ({ item }) => (
    <FollowAvatar
        urlImage={item.urlImage}
        name={item.name}
        date={item.date}

    />
);    
class Friends extends PureComponent {
       
    render() {
        return (
            <View style={styles.container}>
                <FlatList 
                    data={DATA}
                    renderItem={renderFollow}
                    keyExtractor={item => item.name}
            />
            </View>
        );
    }
}

const DATA = [
    {
        urlImage: "https://www.eltiempo.com/files/article_multimedia/uploads/2019/11/07/5dc434e900e5f.jpeg",
        name: "Sara Sofia Zarama Cifuentes",
        date: '@Saritazama',
      
  },
  {
    urlImage: "https://assets.afcdn.com/story/20160810/951677_w800h720cx362cy320.jpg",
    name: "Luis Rivera Hernandez",
    date: '@Luisriveres',
  },
  {
    urlImage: "https://pbs.twimg.com/profile_images/549851078880022528/8X7WyNT9_400x400.jpeg",
    name: "Sergio Hernandez Contreras",
    date: '@sergiouyh',
  },
  {
    urlImage: "https://scontent.fclo8-1.fna.fbcdn.net/v/t1.0-1/p720x720/48362502_2498331116876254_6402442224126132224_n.jpg?_nc_cat=105&ccb=2&_nc_sid=dbb9e7&_nc_ohc=O3ivFCF4SYcAX8jVc62&_nc_ht=scontent.fclo8-1.fna&tp=6&oh=7e89b63e55d3f7250b8d4762ec606cba&oe=5FB84A0A",
    name: "Juan Camilo Delgado MOA",
    date: '@moamusic',
  },
  {
    urlImage: "https://www.elcomercio.com/files/article_main/uploads/2019/09/23/5d8904a49a8b2.jpeg",
    name: "Jose Alvaro Osorio Balvin",
    date: '@jbalvin',
  },
  {
    urlImage: "https://i.pinimg.com/564x/f1/40/4c/f1404c87f540b80b5fcf766e4c1f567d.jpg",
    name: "Valentina Ruiz Carmona ",
    date: '@valecarmon',
  },
  {
    urlImage: "https://www.spanishjournal.com/wp-content/uploads/2019/09/091919entertainment.jpg",
    name: "Austin Agustin Santos",
    date: '@arcangelbaby',
  },
  {
    urlImage: "https://eslamoda.com/wp-content/uploads/sites/2/2015/11/fashion-selfie.jpg",
    name: "Luisa De la cruz Gonzales",
    date: '@luvalecruz',
  },
  {
    urlImage: "https://i.pinimg.com/564x/f1/40/4c/f1404c87f540b80b5fcf766e4c1f567d.jpg",
    name: "Dylan Miguel Fernandez Gonzales",
    date: '@dylanilan',
  },
  {
    urlImage: "https://i.pinimg.com/originals/21/09/02/210902457232e54775bc239033c4a88e.png",
    name: "Fernando Andrés Delgado",
    date: '@ferandres',
  }];
const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight || 0,
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: StatusBar.currentHeight || 0,
       
    },
    title: {
        fontSize: 24,
    }
});
    
export default Friends;