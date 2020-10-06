import React, { PureComponent } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PrincipalFlow from './principalFlow';

const Stack = createStackNavigator();
class AppInitialNavigation extends PureComponent {
    render(){
        return (
        <NavigationContainer>
          <PrincipalFlow />
        </NavigationContainer>
    );}
}
    
export default AppInitialNavigation