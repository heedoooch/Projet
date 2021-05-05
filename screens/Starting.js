import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, SafeAreaView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Home from './Home';
export default function starting({navigation}) {
  const [Fname, onChangeFname] = React.useState(null);
  const [Lname, onChangeLname] = React.useState(null);
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#65DDD8', '#1FB2AC']}
        style={styles.background}
      />

      <Image
        style={styles.logo}
        source={require('../assets/logo-setram.png')}
      />

      <View style={styles.usr}>
        <TextInput
          style={styles.usrin}
          onChangeText={onChangeFname}
          placeholder="First Name"
          placeholderTextColor={'#A4F8F4'}
          placeholderOpacity={0.5}
          value={Fname}
        />
      </View>

      <View style={styles.pswrd}>
        <TextInput
          style={styles.pswrdin}
          onChangeText={onChangeLname}
          secureTextEntry={true}
          placeholder="Last Name"
          placeholderTextColor={'#A4F8F4'}
          placeholderOpacity={0.5}
          value={Lname}
        />
      </View>

      <Pressable 
        style={styles.btn}
        onPress={
            ()=> navigation.push('Home')
        }>
        <Text style={styles.btntxt}>GET STARTED</Text>
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
  background: {
    zIndex: 0,
    width: '100%',
    height: '100%',
  },
  logo: {
    position: 'absolute',
    top: 60,
    width: 273,
    resizeMode: 'contain',
  },
  usr: {
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#51D6D0',
    top: 289,
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
    color: '#fff',
    paddingLeft: 16,
  },
  pswrd: {
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#51D6D0',
    top: 337,
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
    color: '#fff',
    paddingLeft: 16,
  },
  btn: {
    position: 'absolute',
    backgroundColor: '#fff',
    width: 256,
    height: 32,
    top: 417,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btntxt: {
    color: '#1FB2AC',
    fontWeight: 'bold',
    fontSize: 16,
  },
});