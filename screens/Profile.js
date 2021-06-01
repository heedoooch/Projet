import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, TouchableHighlight, View, ScrollView, Image, Touch, TouchableOpacity, Platform , Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import path from 'react-native-path';

export default function Profile({navigation}) {
  const [image,setImage] = useState(null);
  const [age,setAge] = useState('0');
  const [Name, onChangeName] = React.useState("user");
  //
  const getname = async () => {
    try {
        const lname = ( await AsyncStorage.getItem('Lname') ) || "user"
        const fname = await AsyncStorage.getItem('Fname')    
            onChangeName(lname + " " + fname)
    } catch(e) {
    throw e ;
    }
}
getname();
  //
  const useAsyncStorage = async (toSave) => {
    await AsyncStorage.setItem ("profilePic" , toSave);
  }
  const useSetAge = async () => {
    setAge( await AsyncStorage.getItem ("Age") || 0)
  }
  useSetAge () ; 
  const useImage = async () => {
    //debug
    //await AsyncStorage.removeItem("profilePic");
    //console.log("i am in " + path.resolve('../assets/kids.jpg')) ; 
    //>>
    setImage (await AsyncStorage.getItem ("profilePic") );
  }
  useImage();


  useEffect(() => {
    ( async () => {
    if(Platform.OS !== 'web'){
      const{status} =await ImagePicker.requestMediaLibraryPermissionsAsync();
      if(status !=='granted'){
        alert('permission denied!')
      }
    }
})();
},[])

  const pickImage = async () =>{
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect:[4,3],
      quality:1,
    })
    console.log(result)
    if(!result.cancelled){
      setImage(result.uri)
      useAsyncStorage (result.uri); 
    }
  }
  return (
    <ScrollView>
    <View> 
     
       <View style={{width:'100%',backgroundColor:'#ffffff',height:150,padding:10,}}>
            
       </View>
    <View style ={{alignContent:'center',marginLeft:20,}} >
       <Image source = {{uri:image}}  style = {{width:140,height:140,borderRadius:100,marginTop:-70}}/>
       <Text style={{fontSize:25,fontWeight:'bold',padding:10}}>{Name}</Text>
       <Text style={{fontSize:15,fontWeight:'bold',color:'grey', marginLeft:10}}>{age + " ans."} </Text>
    </View>
    <View  style ={{alignSelf:'center'
                      ,flexDirection:'row',
                      justifyContent:'center',
                      backgroundColor:'#fff'
                      ,width:'90%',
                      padding:20,
                      paddingBottom:22,
                      borderRadus:10,
                      shadowOpacity:80,
                      elevation:15,
                      marginTop:20
            }} > 
      <Image source = {require('../assets/tram.png')}  style = {{width:20,height:20}}/>
      <Text style={{fontSize:15,color:'#818181',fontWeight:'bold'}}>Work Place </Text>
    </View>
    <View  style ={{alignSelf:'center'
                      ,flexDirection:'row',
                      justifyContent:'center',
                      backgroundColor:'#fff'
                      ,width:'90%',
                      padding:20,
                      paddingBottom:22,
                      borderRadus:10,
                      shadowOpacity:80,
                      elevation:15,
                      marginTop:20
            }} > 
      <Image source = {require('../assets/tram.png')}  style = {{width:20,height:20}}/>
      <Text style={{ fontSize:15,color:'#818181',fontWeight:'bold'}}>Home Adresse </Text>
    </View>
    <TouchableOpacity  style ={{alignSelf:'center'
                      ,flexDirection:'row',
                      justifyContent:'center',
                      backgroundColor:'#1FB2AC'
                      ,width:'90%',
                      padding:20,
                      paddingBottom:22,
                      borderRadus:10,
                      shadowOpacity:80,
                      elevation:15,
                      marginTop:20,
                      marginBottom:40
            }} 
            onPress={pickImage}> 
      <Text style={{fontSize:15,color:'#fff',fontWeight:'bold'}}>Edit picture</Text>
        </TouchableOpacity>
        <TouchableOpacity  style ={{alignSelf:'center'
                      ,flexDirection:'row',
                      justifyContent:'center',
                      backgroundColor:'#1FB2AC'
                      ,width:'90%',
                      padding:20,
                      borderRadus:10,
                      shadowOpacity:80,
                      elevation:15,
                      marginTop:20,
                      marginBottom:40
            }} 
            onPress={ ()=> navigation.push('edit')}> 
      <Text style={{fontSize:15,color:'#fff',fontWeight:'bold'}}>Edit data</Text>
        </TouchableOpacity>

   </View>
   </ScrollView>  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});