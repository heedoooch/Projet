import { createAppContainer} from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
import Home from '../screens/Home';

//import Offres from '../screens/Offres';
import Header from './header';
import React from 'react';

const screens={
    
    Home: {
        screen: Home,
        navigationOptions: ({navigation})=>{
            return {headerTitle: ()=> <Header navigation={navigation}
            />, } 
        },
    },
    
}

const HomeStack= createStackNavigator(screens);
export default createAppContainer(HomeStack);