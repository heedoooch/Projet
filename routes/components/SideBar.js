import React from 'react';
import {DrawerNavigatorItems} from 'react-navigation-drawer';
import {View, Text,ScrollView,ImageBackground,Image, StyleSheet} from 'react-native';

import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
/*
const [Name , setName] = React.useState('user'); 
const useSetName = async () => {
    setName( await AsyncStorage.getItem ("Name") || "user")
  }
  useSetName () ; 
*/
export default SideBar = props => { 
    const [Name , setName] = React.useState('user'); 
    const [image , setImage] = React.useState (null);
    const getname = async () => {
        try {
            const lname = await AsyncStorage.getItem('Lname')
            const fname = await AsyncStorage.getItem('Fname') 
            try {
            setImage (await AsyncStorage.getItem ("profilePic") ); 
            }
            catch {};
            if (lname && fname )                                 
                setName(lname + " " + fname);
        } catch(e) {        
        throw e ;
        }
    }
    getname();
    let [fontsLoaded] = useFonts({
        'Montserrat-SemiBold': require('../../assets/fonts/Montserrat-SemiBold.ttf'),
    });
      
      if (!fontsLoaded) {
        return <AppLoading />;
      }
    return (
    <ScrollView>
        
        <ImageBackground source={require("./backgr.jpg")} style={{ padding:16,paddingTop:38}}>
        <Image source={ {uri:image} || require("../../assets/profile.png") } style={styles.profile}/>
        <Text style={styles.name} > {Name}. </Text>
        </ImageBackground>
        <View style={styles.container}>
            <DrawerNavigatorItems {...props}/>
        </View>
    </ScrollView>
    )

};
const styles=StyleSheet.create({
    container:{
        flex:1

},
    profile:{
        width:90,
        height:90,
        borderRadius:40,
        borderColor:'white',
        borderWidth:3,
},
    name:{
        fontFamily:"Montserrat-SemiBold",
        fontSize:20,
        color: "#38B497",
        fontWeight:'800',
        marginVertical:8,
        letterSpacing:1,



}
})