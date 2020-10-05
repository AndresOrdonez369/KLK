import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import Feed from '../screens/feed';
import Perfil from '../screens/profile';
import Friends from '../screens/friends';
import Videos from '../screens/videoFeed';
import Radio from '../screens/radio';
    
const Tab = createBottomTabNavigator();
    
export default PrincipalFlow = () => {
    return(
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, size }) => {
                    const iconColor = focused ? 'silver' : '#f0edf6';
                    if (route.name === 'Inicio') {
                        return <Icon name={"home"} type={"material-community"} color={iconColor} size={size} />;
                    }
                    if (route.name === 'Perfil') {
                        return <Icon name={'account'} type={'material-community'} color={iconColor} size={size} />;
                    }if (route.name === 'Panas') {
                        return <Icon name={'account-group'} type={'material-community'} color={iconColor} size={size} />;
                    }if (route.name === 'Videos') {
                        return <Icon name={'video-vintage'} type={'material-community'} color={iconColor} size={size} />;
                    }
                    return(
                         <Icon name={'radio'} type={'material-community'} color={iconColor} size={size} />
                    );
                },
            })}
            initialRouteName={Inicio}
            headerMode='none'
        >
            <Tab.Screen name={"Inicio"} component={Feed} />
            <Tab.Screen name={'Perfil'} component={Perfil} />
            <Tab.Screen name={'Panas'} component={Friends} />
            <Tab.Screen name={'Videos'} component={Videos} />
            <Tab.Screen name={'Radio'} component={Radio} />
        </Tab.Navigator>
    );
}
