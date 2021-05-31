import { StatusBar } from 'expo-status-bar';
import React from "react";
import {  StyleSheet, Text, View, TextInput, SafeAreaView, Pressable } from "react-native";
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import firebase from 'firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import {Linking} from "react-native"


export default function contact({navigation}) {
    const [Name, onChangeName] = React.useState(null);
    const [Message, onChangeMessage] = React.useState(null);
    const [text, setText] = React.useState('Submit');
    //init name 
    const getname = async () => {
      try {
          const lname = await AsyncStorage.getItem('Lname')
          const fname = await AsyncStorage.getItem('Fname')
         //await AsyncStorage.re moveItem('skipeStarting'); 
          const skipe = await AsyncStorage.getAllKeys() ;
          //console.log(skipe)
          //console.log("name : " ,lname , fname )
              onChangeName(lname + " " + fname)
      } catch(e) {
      // error reading value
      throw e ;
      }
  }
  getname();

    let [fontsLoaded] = useFonts({
      'Montserrat': require('../assets/fonts/Montserrat-Regular.ttf'),
      'Montserrat-ExtraBold': require('../assets/fonts/Montserrat-ExtraBold.ttf'),
      'Montserrat-SemiBold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
    });
  
    if (!fontsLoaded) {
      return <AppLoading />;
    }

    return(
    <SafeAreaView  style={styles.container}>
        <Text style={styles.Title}>Contact us</Text>
        <View style={styles.nom} >
         <TextInput
         
                placeholder="enter Name"
                onChangeText={onChangeName}
                style={styles.nomin}
                placeholderOpacity={0.5}
                value={Name}
         />
          </View>
          
         <View style={styles.msg} >

            <TextInput 
                    multiline = {true}
                    numberOfLines = {4}
                    placeholder="enter Message"
                    onChangeText={onChangeMessage}
                    style={styles.msgin}
                    placeholderOpacity={0.5}
                    value={Message}
            />
         </View>
       <Pressable 
        style={styles.btn}
        onPress={
            ()=>{
              console.log(Name , Message)
              if (Name && Message) {
                setText('Submiting ...')
                //const ip = await Network.getIpAddressAsync() ;
                //console.log(ip)
                firebase.firestore().collection('contact').doc().set({

                  message : Message , 
                  //ip : ip ,

                })
                .then(()=> {
                console.log('query is DONE')
                onChangeMessage('');
                onChangeName('');
                setText('Submit');
                

              })
              }
              
            }
        }>
        <Text style={styles.btntxt}>{text}</Text>
      </Pressable>
      <StatusBar style="auto" />
      </SafeAreaView>
       
        );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    Title:{
        fontSize: 32,
        top: '-40%',
        fontFamily:'Montserrat-ExtraBold',
        color:'#1FB2AC'
    },
    nom: {
        position: 'absolute',
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        top: 144,
        width: 288,
        height: 40,
        borderRadius: 4,
        alignItems: 'center',
        shadowOffset:{  width: 0,  height: 2,  },
        shadowColor: 'black',
        shadowOpacity: 0.50,
        elevation: 4,
      },
      nomin: {
        width: 216,
        color: '#000',
        paddingLeft: 16,
      },

      msg: {
        padding:0,
        position: 'absolute',
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        top: 200,
        width: 288,
        height: 200,
        borderRadius: 4,
        alignItems: 'center',
        shadowOffset:{  width: 0,  height: 2,  },
        shadowColor: 'black',
        shadowOpacity: 0.50,
        elevation: 4,
      },
      msgin: {
        width: 216,
        color: 'black',
        paddingLeft: 16,
      },
      btn: {
        position: 'absolute',
        backgroundColor: '#1FB2AC',
        width: 256,
        height: 32,
        top: 472,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
      },
      btntxt: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
      },
    });