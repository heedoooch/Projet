
import {createStackNavigator} from 'react-navigation-stack';
import Alert from '../screens/Alert';
import Header from './header';
import React from 'react';
const screens = {
        Alert:{
        screen:Alert,
        navigationOptions: ({navigation})=>{
            return {headerTitle: ()=> <Header navigation={navigation}
            />, } 
        },
        }
}
const       AlertStack = createStackNavigator(screens);
export default      AlertStack;