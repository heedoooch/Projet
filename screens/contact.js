import { StatusBar } from 'expo-status-bar';
import React from "react";
import {  StyleSheet, Text, View,KeyboardAvoidingView,Platform,Keyboard,TouchableWithoutFeedback, TextInput, SafeAreaView, Pressable, } from "react-native";
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import firebase from 'firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


export default function contact({navigation}) {
    const [Name, onChangeName] = React.useState(null);
    const [Message, onChangeMessage] = React.useState(null);
    const [text, setText] = React.useState('Envoyer');
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
      'Montserrat-Medium': require('../assets/fonts/Montserrat-Medium.ttf'),
    });
  
    if (!fontsLoaded) {
      return <AppLoading />;
    }

    return(

    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={styles.container}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <SafeAreaView  style={styles.container}>
       
      <View style={styles.all}>

      <View style={styles.box}>
        <Text style={styles.Title}>Contactez-Nous</Text>
        </View> 
        <View style={styles.nom} >
          <MaterialCommunityIcons
          name="face"
          color="#1FB2AC"
          size={20}
          style={styles.icon}
          />
         <TextInput
         
                placeholder="Entrer le nom"
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
                    placeholder="Message ..."
                    onChangeText={onChangeMessage}
                    style={styles.msgin}
                    placeholderOpacity={0.5}
                    value={Message}
                    enablesReturnKeyAutomatically={true}
                    returnKeyType="done"
            />
         </View>
         </View>
       <Pressable 
        style={styles.btn}
        onPress={
            ()=>{
              console.log(Name , Message)
              if (Name && Message) {
                setText('...')
                //const ip = await Network.getIpAddressAsync() ;
                //console.log(ip)
                firebase.firestore().collection('contact').doc().set({

                  name : Name , 
                  message : Message , 

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
      <StatusBar style="black" />
      </SafeAreaView>

      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
       
        );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  all:{
    backgroundColor:"rgba(31,178,172,0.4)",
    height:400,
    width:340,
    borderRadius:30,
  },
  icon:{
    marginHorizontal:12,
    marginVertical:2,
  },
    box:{
      width:190,
      marginHorizontal:73,
      marginVertical:30,
    },
    Title:{
        fontSize: 22,
        fontFamily:'Montserrat-SemiBold',
        color:'white'
    },     
    nom: {
        position: 'absolute',
        flexDirection: 'row',
        backgroundColor: '#fff',
        top: 80,
        marginHorizontal:30,
        width: 280,
        height: 40,
        borderRadius:16,
        alignItems: 'center',
        shadowOffset:{  width: 0,  height: 0,  },
        shadowColor: 'black',
        shadowOpacity: 0.60,
        elevation: 4,
      },
      nomin: {
        //width: 216,
        color: '#000',
        //left:19
      },

      msg: {
        padding:0,
        position: 'absolute',
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        top: 130,
        marginHorizontal:30,
        width: 280,
        height: 200,
        borderRadius:20,
        alignItems: 'center',
        shadowOffset:{  width: 0,  height: 0,  },
        shadowColor: 'black',
        shadowOpacity: 0.6,
        elevation: 4,
      },
      msgin: {
        width: 216,
        color: 'black',
        top:-70,
        paddingLeft: 16,
      },
      btn: {
        position: 'absolute',
        backgroundColor: '#1FB2AC',
        width: 190,
        height: 50,
        top: 480,
        borderRadius: 20,
        borderColor:'white',
        borderWidth:0.5,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset:{  width: 0,  height: 0,  },
        shadowColor: '#1FB2AC',
        shadowOpacity: 0.9,
        elevation: 4,
      },
      btntxt: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
        fontFamily:'Montserrat-SemiBold',
        letterSpacing:2,
      },
    });