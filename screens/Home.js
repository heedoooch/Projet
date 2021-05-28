import React, { useCallback, useRef, useMemo } from 'react';
import {useState, useEffect} from "react";
import * as Location from 'expo-location';
import { getDistance, getPreciseDistance, } from 'geolib'
import {markers} from './mapdata';
import Animated from 'react-native-reanimated';
import { BottomSheet } from 'react-native-btr';
import ModalSelector from 'react-native-modal-selector-searchable';
import MapView, { PROVIDER_DEFAULT, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View ,Image,StatusBar,Platform,ScrollView,Text, TextInput,Dimensions,Pressable,TouchableOpacity} from 'react-native';
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
const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;
export default function Home( { navigation }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [state, setState] = React.useState(initialMapState);
  const [text, setText] = useState('');
  const mapRef = React.createRef(); 
  const [visible, setVisible] = useState(false);
  
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
   };
  const success= (pos) => {
    var crd = pos.coords;
    console.log('Votre position actuelle est :');
      latt=crd.latitude;
      longg=crd.longitude;
      console.log(`Latitude : ${latt}`);
      console.log(`Longitude : ${longg}`);
      console.log(`La précision est de ${crd.accuracy} mètres.`);
    }
  const error=(err)=> {
    console.warn(`ERREUR (${err.code}): ${err.message}`);
    }
  navigator.geolocation.getCurrentPosition(success, error, options);
  const toggleBottomNavigationView = () => {
    setVisible(!visible);
       };
       /*const dis = getPreciseDistance(
        { latitude: latt, longitude: longg},
        { latitude: location.coordinate.latitude, longitude: location.coordinate.longitude},
      );*/
      /*
    //alert('La distance est :  '+ dis +' en M ' + dis/1000 +' KM');
    };*/
  let  onMarkerPressed = (location) => {
    mapRef.current.animateToRegion({
      latitude: location.coordinate.latitude,
      longitude: location.coordinate.longitude,
      latitudeDelta: 0.013912707615531872,
      longitudeDelta: 0.010586678981781006,
    })}
  
    return (
      <>
        <StatusBar barStyle = "dark-content" hidden = {false}  translucent = {false}/>
        <View style={styles.container}>
            <MapView style={styles.maps} 
              provider={PROVIDER_GOOGLE}
              ref={mapRef}
              showsUserLocation={true}
              initialRegion={{ 
              latitude: 35.2110072563716,
              longitude:-0.6319478899240494,
              longitudeDelta:0.04290930926799774,
              latitudeDelta:0.05637356632725954,}}
              mapType= 'terrain' 
              onRegionChangeComplete={console.log}  
            >
            {state.markers.map((marker, index) =>  (
                      <MapView.Marker 
                        key={index} 
                        coordinate={marker.coordinate}
                        title={marker.label} 
                        onPress={()=>{ 
                          toggleBottomNavigationView();
                          onMarkerPressed(marker);}} 
                      > 
                            <View style={[styles.markerWrap]}>
                              <Image
                                source={require('../assets/map_marker.png')}
                                style={styles.marker}
                                resizeMode="cover"
                              />
                            </View>
                      </MapView.Marker>
                    ))}
            </MapView>
            <View 
              style={styles.searchBox} >
            <ModalSelector
              data={markers}
              accessible={true}
              scrollViewAccessibilityLabel={'Scrollable options'}
              //cancelButtonAccessibilityLabel={'Cancel Button'}
              onChange={(option)=>{ setText(option.label); onMarkerPressed(option); toggleBottomNavigationView();}} >
                
                <TextInput
                  placeholder="Search here"
                  placeholderTextColor="black"
                  autoCapitalize="none"
                  style={{paddingLeft:3,width: 326,}}
                  //editable={false}
                  onChangeText={text => setText(text)}
                  value={text} /> 
                   
                  
            </ModalSelector>
            
            <Ionicons name="ios-search" size={20} /> 
            
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
              contentContainerStyle={{ paddingRight: Platform.OS === 'android' ? 20 : 0}}>
              {state.categories.map((category, index) => (
                <TouchableOpacity key={index} style={styles.catItem}>
                    {category.icon}
                  <Text>{category.name}</Text>
                </TouchableOpacity>))}
          </ScrollView>
        </View>
     <BottomSheet
          visible={visible}
          onBackButtonPress={toggleBottomNavigationView}
          onBackdropPress={toggleBottomNavigationView} >
          <View style={styles.bottomNavigationView}>
          <View
              style={{flex: 1,flexDirection: 'column',justifyContent: 'space-between',}}>
              <Text
                style={{textAlign: 'center',padding: 20,fontSize: 20,}}>
               </Text>
              <View style={styles.first} >
                  <Image style={styles.tram} />
                  <Text style={styles.prochain}> Prochains{"\n"}Tramways</Text>
                  <View style={styles.textf}>
                  <View >
                      <Text style={styles.num}> 05  </Text>
                      <Text style={styles.min}>  min </Text>
                  </View>
                   <View>
                      <Text style={styles.num}> 05  </Text>
                      <Text style={styles.min}>  min </Text>
                  </View>
                  </View>
                  
             </View>

             <View style={styles.sec}>
                  <Image style={styles.dis} />
                  <Text style={styles.res}> Distance{"\n"}restante</Text>
                  <View>
                      <Text style={styles.num2}> 1.2 </Text>
                      <Text style={styles.min2}>  Km </Text> 
                  </View>
                  <View>
                      <Text style={styles.par}> (0.7 min) </Text>
                  </View>

             </View>
             </View>
             
             </View>
        </BottomSheet>
        
      </>
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
      marginTop: Platform.OS === 'ios' ? 5 : 9, 
      flexDirection:"row",
      backgroundColor: '#fff',
      width: '98%',
      height:40,
      borderRadius:20,
      alignSelf:'center',
      padding: 10,
      shadowColor: '#ccc',
      shadowOffset: { width: 1, height: 3 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      elevation: 10,
    },
    catScrollView: {
      position:'absolute', 
      top:Platform.OS === 'ios' ? 50 : 68, 
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
    },
    selected:{
      backgroundColor:'red',
    },
    bottomNavigationView: {
      backgroundColor: '#fff',
      width: '100%',
      height: 316,
      justifyContent: 'center',
      alignItems: 'center',
      borderTopLeftRadius:25,
      borderTopRightRadius:25,
    },
    first:{
      position:'absolute',
      height: 206,
      width: 138,
      left: 30,
      top: 402,
      borderRadius: 8,
      backgroundColor: '#FFF',
      borderColor: '#1FB2AC',
      borderWidth:3,   
    },
    sec:{
      position:'absolute',
      height: 206,
      width: 138,
      left: 192,
      top: 402,
      borderRadius: 8,
      backgroundColor: '#FFF',
      borderColor: '#1FB2AC',
      borderWidth:3,   
    },
    tram:{
      position: 'absolute',
      width: 21.3,
      height: 30,
      left: 89,
      top: 420,
    },
    prochain:{
      position: 'absolute',
      width: 95,
      height: 44,
      left: 51,
      top: 461,
      
      fontWeight: '600',
      fontSize: 18,
      textAlign:'center',
      color: '#000',
    },
    num:{
      position: 'absolute',
      width: 106,
      height: 88,
      left: 46,
      
      fontWeight:"800",
      fontSize: 36,
      textAlign: 'center',
      color: '#1FB2AC',
    },
    min:{
      position: 'absolute',
      width: 106,
      height: 88,
      left: 46,
      
      fontWeight: '600',
      fontSize: 24,
      textAlign: 'center',
      color: '#000',
    },
    textf:{
      top: 513,
    },
    dis:{
      position: 'absolute',
      width: 31.36,
      height: 30,
      left: 245,
      top: 420,
    },
    res:{
      position: 'absolute',
      width: 82,
      height: 44,
      left: 224,
      top: 461,
      
      fontWeight: '600',
      fontSize: 18,
      textAlign: 'center',
      color: '#000',
    },
    num2:{
      position: 'absolute',
      width: 103,
      height: 70,
      left: 209,
      top: 520,
      
      fontWeight: '800',
      fontSize: 36,
      textAlign: 'center',
      color:'#1FB2AC',

    },
    min2:{
      position: 'absolute',
      width: 103,
      height: 70,
      left: 209,
      top: 520,
      
      fontWeight: '600',
      fontSize: 24,
      textAlign:'center',
      color: '#000'
    },
    par:{
      position: 'absolute',
      width: 103,
      height: 70,
      left: 209,
      top: 520,
      fontWeight: '600',
      fontSize: 24,
      textAlign: 'center',
      color: '#807E7E',
    },
    //
});