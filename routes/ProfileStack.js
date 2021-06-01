import {createStackNavigator} from 'react-navigation-stack';
import Profile from '../screens/Profile';
import Header from './header';
import React from 'react';
import edit from '../screens/edit';
const screens = {
    Profile:{
        screen: Profile,
        name : "Profile",
        navigationOptions: ({navigation})=>{
            return {headerTitle: ()=> <Header navigation={navigation}
            />, } 
        },
        },
     edit:{
            screen: edit,
            headerMode: 'none',
            name : "Edit",
            navigationOptions: {headerVisible: false,}
                 
            },
            
}
const ProfileStack = createStackNavigator(screens);
export default ProfileStack;
