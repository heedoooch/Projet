
import {createStackNavigator} from 'react-navigation-stack';
import Profile from '../screens/Profile';
import Header from './header';
import React from 'react';
const screens = {
    Profile:{
        screen: Profile,
        navigationOptions: ({navigation})=>{
            return {headerTitle: ()=> <Header navigation={navigation}
            />, } 
        },
        }
}
const ProfileStack = createStackNavigator(screens);
export default ProfileStack;