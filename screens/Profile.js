import React, {useState, useEffect} from 'react';
import { StyleSheet, Text,View, ScrollView, Image,TouchableOpacity, Platform  } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';
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
            onChangeName(lname + "" + fname)
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
  let [fontsLoaded] = useFonts({
    'Montserrat-ExtraBold': require('../assets/fonts/Montserrat-ExtraBold.ttf'),
    'Montserrat-SemiBold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
});
  
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <ScrollView>
    <View> 
     <View style={{width:'100%',backgroundColor:'#ffffff',height:120,padding:10,}}>
    </View>
     <View style={{flex:1,flexDirection:"row", left:20}}>
      <TouchableOpacity onPress={pickImage}>
       <Image source = {{uri:image}}
              style = {{width:130,height:130,borderRadius:100,
                      borderWidth:3,borderColor:"#1FB2AC",marginTop:-70}}/>
        </TouchableOpacity>
        <View stylw={{flexDirection:"row", }}>
       <Text style={{fontSize:20,fontFamily:"Montserrat-SemiBold",left:9,letterSpacing:-0.5}}>{Name}</Text>
       <Text style={{fontSize:15,color:'grey', }}> {age + " ans."} </Text> 
       </View>
      </View>
    <View  style ={{alignSelf:'center'
                      ,flexDirection:'row',
                      justifyContent:'center',
                      backgroundColor:'#fff'
                      ,width:'90%',
                      padding:20,
                      paddingBottom:22,
                      borderRadius:20,
                      shadowOpacity:10,
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
                      borderRadius:20,
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