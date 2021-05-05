import React from 'react';
import {markers} from './mapdata';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View ,Animated, Platform,ScrollView,Text, TextInput, TouchableOpacity} from 'react-native';


import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
const initialMapState = {
  markers,
  categories: [
    {
      name: 'Home',
      icon:<MaterialCommunityIcons name="home-variant" style={{marginRight: 5}} size={18} />,},
      { 
        name: 'Work', 
        icon: <MaterialCommunityIcons style={{marginRight: 5}} name="briefcase" size={18} />,
      },
      {
        name: 'Station Tramway',
        icon: <MaterialCommunityIcons name="subway-alert-variant" style={{marginRight: 5}} size={18} />,
      },
    { 
      name: 'Fastfood', 
      icon: <MaterialCommunityIcons style={{marginRight: 5}} name="food-fork-drink" size={18} />,
    },
    {
      name: 'Restaurant',
      icon: <Ionicons name="ios-restaurant" style={{marginRight: 5}} size={18} />,
    },
    
    {
      name: 'Hotel',
      icon:<MaterialCommunityIcons name="bed" style={{marginRight: 5}} size={18} />,}
],
};


export default function Home( { navigation }) {
 
  const [state, setState] = React.useState(initialMapState);

    return (
     
      <View style={styles.container}>
         
      <MapView style={styles.maps} 
      provider={PROVIDER_GOOGLE}
      initialRegion={{ 
       latitude: 35.20439364921614,
       longitude:-0.6303000297040594,
       longitudeDelta:0.040142817690068,
       latitudeDelta:0.04864195044303443,}}
       mapType= 'hybrid' 
       >
         {state.markers.map((marker, index) => (
         <MapView.Marker key={index} coordinate={marker.coordinate} title={marker.title}>
              <Animated.View style={[styles.markerWrap]}>
                <Animated.Image
                  source={require('../assets/map_marker.png')}
                  style={[styles.marker]}
                  resizeMode="cover"
                />
              </Animated.View>
            </MapView.Marker> ))}
          </MapView>
          <View style={styles.searchBox}>
         <TextInput
         placeholder='search here'
         placeholderTextColor="black"
         autoCapitalize="none"
         style={{flex:1,padding:0}}/>
         <Ionicons name="ios-search" siz={20}/>
         </View>
         <ScrollView
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        height={50}
        style={styles.catScrollView}
        contentInset={{ // iOS only
          top:0,
          left:0,
          bottom:0,
          right:20
        }}
        contentContainerStyle={{
          paddingRight: Platform.OS === 'android' ? 20 : 0
        }}
      >
        {state.categories.map((category, index) => (
          <TouchableOpacity key={index} style={styles.catItem}>
            {category.icon}
            <Text>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
       </View>
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    maps: {
     left: 0,
     right:0,
     top:0,
     bottom:0,
     position:'absolute',
    },
    searchBox: {
      position:'absolute', 
      marginTop: Platform.OS === 'ios' ? 10 : 20, 
      flexDirection:"row",
      backgroundColor: '#fff',
      width: '98%',
      alignSelf:'center',
      borderRadius: 5,
      padding: 10,
      shadowColor: '#ccc',
      shadowOffset: { width: 1, height: 3 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      elevation: 10,
    },
    catScrollView: {
      position:'absolute', 
      top:Platform.OS === 'ios' ? 63 : 80, 
      paddingHorizontal:3,
    },
    catItem: {
      flexDirection:"row",
      backgroundColor:'#fff', 
      borderRadius:20,
      padding:8,
      paddingHorizontal:20, 
      marginHorizontal:4,
      height:35,
      shadowColor: '#ccc',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      elevation: 10,
    },
    markerWrap: {
      alignItems: "center",
      justifyContent: "center",
      width:50,
      height:50,
    },
    marker: {
      width: 30,
      height: 30,
  },});