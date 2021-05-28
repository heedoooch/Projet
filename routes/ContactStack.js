import {createStackNavigator} from 'react-navigation-stack';
import Contact from '../screens/Contact';
import Header from './header';
import React from 'react';
const screens = {
        Contact:{
        screen:Contact,
        navigationOptions: ({navigation})=>{
            return {headerTitle: ()=> <Header navigation={navigation}
            />, } 
        },
        }
}
const       ContactStack = createStackNavigator(screens);
export default      ContactStack;
