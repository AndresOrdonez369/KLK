import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PrincipalFlow from './principalFlow';
const AppInitialNavigation = () => {
    const Stack = createStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator headerMode='none'>
               <PrincipalFlow />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
    
export default AppInitialNavigation