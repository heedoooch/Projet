import React from 'react';
import {StyleSheet,Text, View,Platform,Image} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';

export default function Header({navigation}){
   const openMenu=()=> {
        navigation.openDrawer();
   }
    return(
        <View style={styles.header}>
            
            <MaterialIcons name='menu' color='#1FB2AC' size={28} onPress={openMenu} style={styles.icon}/>
            <View>

            <Image
                source={require("../assets/logoo.png")}
                style={styles.logo}
               />
            </View>
        </View>
    );
}
const styles= StyleSheet.create({
    header:{
        width:'100%',
        height:'90%',
        flexDirection:'row',
        alignItems:'center',
        //justifyContent:'center',
       
    },
    headerText:{
        fontWeight: 'bold',
        fontSize:22,
        justifyContent:'center',
        color: "#38B497",
        letterSpacing:1,
     },
     icon:{
        position:'absolute',
        left:  Platform.OS === 'android' ? 4 : -95,

     },
     logo:{
     height:120,
     width:160,
     resizeMode:"cover",
     bottom:-2
     

     }

});