import React, { PureComponent } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PrincipalFlow from './principalFlow';
import Login from '../screens/login/index';
import PasswordRecovery from '../screens/passwordRecovery/index';
import Registry from '../screens/registry/index';

const Stack = createStackNavigator();
function authStack(){
  return(
    <Stack.Navigator headerMode="none" initialRouteName="Login">
      <Stack.Screen name="Login" component={Login}/>  
      <Stack.Screen name="Registry" component={Registry}/>  
      <Stack.Screen name="PasswordRecovery" component={PasswordRecovery}/>  
      <Stack.Screen name="PrincipalFlow" component={PrincipalFlow}/>  
    </Stack.Navigator>
  )
}
class AppInitialNavigation extends PureComponent {
    render(){
        return (
        <NavigationContainer >
          <Stack.Navigator headerMode="none">
            <Stack.Screen name="AuthStack" component={authStack}/>
          </Stack.Navigator>
        </NavigationContainer>
    );}
}
    
export default AppInitialNavigation