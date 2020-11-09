import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';
import Feed from '../screens/feed';
import Perfil from '../screens/profile';
import Friends from '../screens/friends';
import Videos from '../screens/videoFeed';
import Radio from '../screens/radio';
import Post from '../screens/post';
import Settings from '../screens/settings';
import Comments from '../screens/comments';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function FeedStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Feed" component={Feed} />
    </Stack.Navigator>
  );
}

function profileStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="PerfilStack" component={Perfil} />
      <Stack.Screen name="Configuraciones" component={Settings} />
    </Stack.Navigator>
  );
}

const PrincipalFlow = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, size }) => {
        const iconColor = focused ? '#F82121' : '#f0edf6';
        if (route.name === 'Inicio') {
          return <Icon name="home" type="material-community" color={iconColor} size={size} />;
        }
        if (route.name === 'Perfil') {
          return <Icon name="account" type="material-community" color={iconColor} size={size} />;
        } if (route.name === 'Panas') {
          return <Icon name="account-group" type="material-community" color={iconColor} size={size} />;
        } if (route.name === 'Videos') {
          return <Icon name="video-vintage" type="material-community" color={iconColor} size={size} />;
        }
        return (
          <Icon name="radio" type="material-community" color={iconColor} size={size} />
        );
      },
    })}
    initialRouteName="Inicio"
    headerMode="none"
  >
    <Tab.Screen name="Inicio" component={FeedStack} />
    <Tab.Screen name="Perfil" component={profileStack} />
    <Tab.Screen name="Panas" component={Friends} />
    <Tab.Screen name="Videos" component={Videos} />
    <Tab.Screen name="Radio" component={Radio} />
  </Tab.Navigator>
);

function AppHide() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="PrincipalFlow" component={PrincipalFlow} />
      <Stack.Screen name="Comments" component={Comments} />
      <Stack.Screen name="CreatePost" component={Post} />
    </Stack.Navigator>
  );
}

export default AppHide;
