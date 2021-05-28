import {createDrawerNavigator} from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import HomeStack from './HomeStack';
import React from 'react';
import ProfileStack from './ProfileStack';
import AboutStack from './AboutStack';
import OffresStack from './OffresStack';
import SideBar from './components/SideBar';
import AlertStack from './AlertStack';
import ContactStack from "./ContactStack"


import { Image} from 'react-native';

  const Drawer = createDrawerNavigator({
      
      Home: {
          screen: HomeStack,
          navigationOptions:{
            drawerIcon:(<Image source={require('../assets/home.png')}
                      style={{height:24, width:24}}/>),},
        },
      Offres: {
        screen:OffresStack,
        navigationOptions:{  drawerIcon:(<Image source={require('../assets/special.png')}
        style={{height:24, width:24}}/>),},
        },
       Alert :{
         screen:AlertStack,
         navigationOptions:{  drawerIcon:(<Image source={require('../assets/bell.png')}
        style={{height:24, width:24}}/>),},

        }, 
       
      Profile :{
          screen: ProfileStack,
          navigationOptions:{  drawerIcon:(<Image source={require('../assets/userr.png')}
          style={{height:24, width:24}}/>),
        },
      },
      Contact:{
        screen: ContactStack,
        navigationOptions:{  drawerIcon:(<Image source={require('../assets/apple-contacts.png')}
        style={{height:24, width:24}}/>)
  ,
      },
    },
      About:{
        screen: AboutStack,
        navigationOptions:{  drawerIcon:(<Image source={require('../assets/about.png')}
        style={{height:24, width:24}}/>)
      ,
      },
    },
   

    },
    {
      contentComponent: props => <SideBar{...props}/>,
     contentOptions:{
       activeBackgroundColor:"rgba(63,191,191,0.2)",
       activeTintColor:"#38B497", drawerBackgroundColor: '#0000FF',
     }
    }

    );
  export default createAppContainer(Drawer);