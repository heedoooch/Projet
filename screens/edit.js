import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, SafeAreaView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import Home from './Home';
export default function starting({navigation}) {
  const [Fname, onChangeFname] = React.useState(null);
  const [Lname, onChangeLname] = React.useState(null);
  const [age, onChangeAge] = React.useState(null);
  const [text, setText] = React.useState("VALIDER");

  let [fontsLoaded] = useFonts({
    'Montserrat': require('../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-ExtraBold': require('../assets/fonts/Montserrat-ExtraBold.ttf'),
    'Montserrat-SemiBold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
  });


  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.Title}>Edit</Text>
      
      <View style={styles.usr}>
        <TextInput
          style={styles.usrin}
          onChangeText={onChangeFname}
          placeholder="First Name"
          placeholderTextColor={'#000'}
          placeholderOpacity={0.3}
          value={Fname}
        />
      </View>

      <View style={styles.pswrd}>
        <TextInput
          style={styles.pswrdin}
          onChangeText={onChangeLname}
          placeholder="Last Name"
          placeholderTextColor={'#000'}
          placeholderOpacity={0.3}
          value={Lname}
        />
      </View>
      <View style={styles.age}>
        <TextInput
          style={styles.pswrdin}
          onChangeText={onChangeAge}
          placeholder="Age"
          placeholderTextColor={'#000'}
          placeholderOpacity={0.3}
          keyboardType = 'numeric'
          value={age}
        />
      </View>

      <Pressable 
        style={styles.btn}
        onPress={
                async ()=> {
                  if (Lname && Fname && age) {
                    //save to local db 
                    await AsyncStorage.setItem( 'Lname' , Lname ) ; 
                    await AsyncStorage.setItem( 'Fname' , Fname ) ; 
                    await AsyncStorage.setItem( 'Age' , age ) ; 
                    setText('SAVING...') ; 
                    //quite the page 
                    //redirection : 
                    navigation.push('Profile')
                    
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
  text: {
    position: 'absolute',
    color: '#fff',
    fontSize: 14,
    top: 607,
  },
  textb: {
    position: 'absolute',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  Title:{
    fontSize: 32,
    top: -210,
    fontFamily:'Montserrat-ExtraBold',
    color:'#18817C'
  },
  background: {
    color: "#fff",
    zIndex: 0,
    width: '100%',
    height: '100%',
  },
  usr: {
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    top: 189,
    width: 288,
    height: 40,
    borderRadius: 4,
    alignItems: 'center',
    shadowOffset:{  width: 0,  height: 2,  },
    shadowColor: 'black',
    shadowOpacity: 0.50,
    elevation: 4,
  },
  usrin: {
    width: 216,
    color: '#000',
    paddingLeft: 16,
  },
  pswrd: {
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    top: 237,
    width: 288,
    height: 40,
    borderRadius: 4,
    alignItems: 'center',
    shadowOffset:{  width: 0,  height: 2,  },
    shadowColor: 'black',
    shadowOpacity: 0.50,
    elevation: 4,
  },
  age:{
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    top: 283,
    width: 288,
    height: 40,
    borderRadius: 4,
    alignItems: 'center',
    shadowOffset:{  width: 0,  height: 2,  },
    shadowColor: 'black',
    shadowOpacity: 0.50,
    elevation: 4,
  },
  pswrdin: {
    width: 216,
    color: '#000',
    paddingLeft: 16,
  },
  btn: {
    position: 'absolute',
    backgroundColor: '#1FB2AC',
    width: 256,
    height: 32,
    top: 367,
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