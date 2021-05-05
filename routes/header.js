import React from 'react';
import {StyleSheet,Text, View} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';

export default function Header({navigation}){
   const openMenu=()=> {
        navigation.openDrawer();
   }
    return(
        <View style={styles.header}>
            <MaterialIcons name='menu' size={28} onPress={openMenu} style={styles.icon}/>
            <View>
                <Text style={styles.headerText}>Setram</Text>
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
        justifyContent:'center',
        borderBottomWidth: 0,
        

    
        
    },
    headerText:{
        fontWeight: 'bold',
        fontSize:22,
        justifyContent:'center',
        color:'black',
        letterSpacing:1,
     },
     icon:{
        position:'absolute',
        left: -69

     }

});