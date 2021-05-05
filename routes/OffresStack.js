
import {createStackNavigator} from 'react-navigation-stack';
import Offres from '../screens/Offres';
import Header from './header';
import React from 'react';
const screens = {
        Offres:{
        screen:Offres,
        navigationOptions: ({navigation})=>{
            return {headerTitle: ()=> <Header navigation={navigation}
            />, } 
        },
        }
}
const       OffresStack = createStackNavigator(screens);
export default      OffresStack;