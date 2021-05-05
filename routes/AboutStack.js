
import {createStackNavigator} from 'react-navigation-stack';
import About from '../screens/About';
import Header from './header';
import React from 'react';
const screens = {
    About:{
        screen: About,
        navigationOptions: ({navigation})=>{
            return {headerTitle: ()=> <Header navigation={navigation}
            />, } 
        },
        }
}
const AboutStack = createStackNavigator(screens);
export default AboutStack;