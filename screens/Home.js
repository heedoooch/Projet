import React from 'react';
import {useState , useEffect} from "react";
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import { findNearest, getPreciseDistance,orderByDistance, getDistance } from 'geolib';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import {markers, stations} from './mapdata';
import { Provider as PaperProvider } from 'react-native-paper';
import { BottomSheet } from 'react-native-btr';
import ModalSelector from 'react-native-modal-selector-searchable';
import MapView, { PROVIDER_DEFAULT, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View ,Image,StatusBar,Platform,ScrollView,Text, TextInput,Dimensions,Pressable,TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialMapState = {
  markers,
  categories: [
    {
      name: 'Maison',
      icon:<MaterialCommunityIcons name="home-variant" style={{marginRight: 5}} size={18} />,},
      { 
        name: 'Travial', 
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
export default function Home( { navigation }) {
  const [state, setState] = React.useState(initialMapState);
  const [text, setText] = useState('');
  const mapRef = React.createRef(); 
  const [visible, setVisible] = useState(false);
  const [dialog,setDialog]=useState(false);
  const showDialog = () => setDialog(true);
  const [liked, setLiked] = useState(false);
  const hideDialog = () => setDialog(false);
  const [station,setStation]=useState('');
  const [userLaty,setUserLaty]=useState(0);
  const [userLongy,setUserLongy]=useState(0);
  const [minutes,setMinutes]=useState(0);
  const [massafa,setMassafa]=useState(90);
  const [proche,setProche]=useState();
  const likedbutton= async(station)=>{ 
    await AsyncStorage.getItem('favoris');
    const obj =  JSON.parse(favoris);
    if (station in obj )
      setLiked(true);
    
    
  };

  const toggleBottomNavigationView = () => {
    setVisible(!visible);
       };
  var options = {
    enableHighAccuracy: true,
    timeout: 60000,
    maximumAge: 0
   };
  const success= (pos) => {
      var crd = pos.coords;
    console.log('Votre position actuelle est :');
      latt=crd.latitude;
      longg=crd.longitude;
      setUserLaty(latt);
      setUserLongy(longg);
      console.log(`Latitude : ${latt}`);
      console.log(`Longitudeeeee :3 : ${longg}`);
      console.log(`La précision est de ${crd.accuracy} mètres.`);
    }
  const error=(err)=> {
    console.warn(`ERREUR (${err.code}): ${err.message}`);
    }
  navigator.geolocation.getCurrentPosition(success, error, options);
  console.log(JSON.stringify(orderByDistance({latitude:userLaty,longitude:userLongy},stations)));
  var nearest = orderByDistance({latitude:userLaty,longitude:userLongy},stations)[0].latitude ;
  console.log (nearest);
  useEffect(() => {
    markers.forEach(element => {
      if (element.coordinate.latitude == nearest) {
            setProche(element);
            console.log('\n \n hiiiiiiiiiiiii23i45672345678w34567',proche);
            return ;
      }
    } )
  });
 
  let  onMarkerPressed = (location) => {
    mapRef.current.animateToRegion({
      latitude: location.coordinate.latitude,
      longitude: location.coordinate.longitude,
      latitudeDelta: 0.012,
      longitudeDelta: 0.0090586678981781006,
    });}
    let [fontsLoaded] = useFonts({
      'Montserrat': require('../assets/fonts/Montserrat-Regular.ttf'),
      'Montserrat-ExtraBold': require('../assets/fonts/Montserrat-ExtraBold.ttf'),
      'Montserrat-SemiBold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
      'Montserrat-Medium':require('../assets/fonts/Montserrat-Medium.ttf')
    });
    if (!fontsLoaded) {
      return <AppLoading />;
    }
    return (
      <PaperProvider>
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
              //onRegionChangeComplete={console.log}  
            >
            {state.markers.map((marker, index) =>  (
                      <MapView.Marker 
                        key={index} 
                        coordinate={marker.coordinate}
                        title={marker.label} 
                        onPress={()=>{ 
                          onMarkerPressed(marker);
                          setStation(marker.label);
                          setMassafa(getDistance(
                            { latitude: userLaty, longitude: userLongy},
                            { latitude: marker.coordinate.latitude, longitude: marker.coordinate.longitude},));
                          setMinutes(Math.round(massafa/83.33));

                          toggleBottomNavigationView();
                      } 
                        }
                      > 
                            <View style={[styles.markerWrap]}>
                              <Image
                                source={require('../assets/map_marker.png')}
                                style={styles.marker}
                                resizeMode="contain"
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
              //scrollViewAccessibilityLabel={'Scrollable options'}
              //cancelButtonAccessibilityLabel={'Cancel Button'}
              onChange={(option)=>{ setText(option.label);
                                  onMarkerPressed(option); 
                                  setStation(option.label);
                                  setMassafa(getDistance(
                                    { latitude: userLaty, longitude: userLongy},
                                    { latitude: option.coordinate.latitude, longitude: option.coordinate.longitude},));
                                  setMinutes(Math.round(massafa/83.33));
                                  toggleBottomNavigationView();
                                  }} >
                <TextInput
                  placeholder="Recherche ..."
                  placeholderTextColor="black"
                  autoCapitalize="none"
                  style={{paddingLeft:3,width: 326, }}
                  //editable={false}
                  onChangeText={text => setText(text)}
                  value={text} /> 
            </ModalSelector>
            <Ionicons name="ios-search" size={20}  color="#1FB2AC"/> 
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
                <TouchableOpacity key={index} style={styles.catItem} >
                    {category.icon}
                  <Text style={{fontFamily:"Montserrat-Medium",}}>{category.name}</Text>
                </TouchableOpacity>))}
          </ScrollView>
          <Button onPress={showDialog}  style={styles.dialog} color="#1FB2AC"> 
                <Image source={require("../assets/help.png")} style={styles.icon}/>
          </Button>
          <Portal>
        <Dialog visible={dialog} onDismiss={hideDialog}>
          <Dialog.Title style={styles.alerty}>La station la plus proche 🚊: </Dialog.Title>
          <Dialog.Content>
            <Paragraph style={styles.near}> {proche.label}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
          <Button color= "#1FB2AC" onPress={hideDialog}> Où ?📍</Button>
            <Button color= "#1FB2AC"  onPress={hideDialog}>Merci! 💚</Button>
           
          </Dialog.Actions>
        </Dialog>
        
      </Portal>
        </View>
        <BottomSheet
          visible={visible}
          //onBackButtonPress={toggleBottomNavigationView}
          onBackdropPress={toggleBottomNavigationView}>
          <View style={styles.bottomNavigationView}>
          <View style={{flexDirection:"row",}}>
          <Text style={styles.markerTitle}>{station}</Text>
          <View style={{top:24, right:3,}}>
          <Pressable onPress={likedbutton}>
           <MaterialCommunityIcons
            name={liked ? "heart" : "heart-outline"}
            size={32}
            color={liked ? "red" : "black"} />
            
       </Pressable>
       </View>
       </View>
          <View
              style={{flex: 1,flexDirection: 'column',justifyContent: 'space-between',}}>
              <View style={styles.first} >
                  <Image
                    style={styles.tram}
                    source={require('../assets/tram.png')}
                  />
                  <Text style={styles.prochain}>Prochains{"\n"}Tramways</Text>
                  <View style={styles.textf}>
                    <View>
                        <Text style={styles.dir}>Gare Routière Sud</Text>
                        <Text style={styles.num}>05</Text>
                        <Text style={styles.min}>min</Text>
                    </View>
                    <View style={styles.tram2}>
                        <Text style={styles.dir2}>Les Cascades</Text>
                        <Text style={styles.num}>12</Text>
                        <Text style={styles.min}>min</Text>
                    </View>
                  </View>
                  
             </View>

             <View style={styles.sec}>
                  <Image 
                    style={styles.dis}
                    source={require('../assets/distance.png')}
                  />
                  <Text style={styles.res}>Distance{"\n"} restante</Text>
                  <View style={styles.textf}>
                    <View>
                        <Text style={styles.num2}>{massafa/1000}</Text>
                        <Text style={styles.min2}>km</Text> 
                    </View>
                    <View>
                        <Text style={styles.par}>(~ {minutes} min)</Text>
                    </View>
                  </View>
             </View>
             </View>
             
             </View>
        </BottomSheet>
        
        
      </>
      </PaperProvider>
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
    alerty:{
      fontSize:18,
      fontFamily: 'Montserrat-ExtraBold',
    },
    near:{
      fontFamily:"Montserrat-SemiBold",
      
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
    dialog:{
      top:91,
      backgroundColor:'#fff', 
      borderRadius:30,
      height:40,
      width:20,
      shadowColor: '#1FB2AC',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.4,
      shadowRadius: 5,
      left:width-73,
    },
    icon:{
      left:7,
      height:28,
      width:28,
      resizeMode:"cover",
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
    markerTitle:{
      textAlign: 'center',
      padding: 20,
      fontSize: 20,
      top: 8,
      fontFamily:'Montserrat-ExtraBold',
      color:'#18817C'
    },
    first:{
      position:'absolute',
      height:  Platform.OS === 'android' ? 206 : 220,
      width: 138,
      left: -150,
      top: 12,
      borderRadius: 8,
      backgroundColor: '#FFF',
      borderColor: '#1FB2AC',
      borderWidth:2,   
    },
    sec:{
      position:'absolute',
      height:  Platform.OS === 'android' ? 206 : 220,
      width: 138,
      left: 12,
      top: 12,
      borderRadius: 8,
      backgroundColor: '#FFF',
      borderColor: '#1FB2AC',
      borderWidth:2,   
    },
    tram:{
      position: 'absolute',
      width: 21.3,
      height: 30,
      left: 59,
      top: 18,
    },
    prochain:{
      position: 'absolute',
      left: 21,
      top: 59,
      fontFamily: 'Montserrat-SemiBold',
      fontSize: 18,
      color: '#000',
    },
    dir: {
      position: 'absolute',
      top:  Platform.OS === 'android' ? 3 : 0,
      left: 12,
      fontFamily: 'Montserrat-SemiBold',
      fontSize: 12,
    },
    num:{
      position: 'absolute',
      right: 72,
      top: 15,
      fontFamily: 'Montserrat-ExtraBold',
      fontSize: 24,
      color: '#1FB2AC',
    },
    min:{
      position: 'absolute',
      left: 72,
      top: 22,
      fontFamily: 'Montserrat-SemiBold',
      fontSize: 18,
      textAlign: 'center',
      color: '#000',
    },
    dir2: {
      position: 'absolute',
      top:  Platform.OS === 'android' ? 6 : 2,
      left: 30,
      fontFamily: 'Montserrat-SemiBold',
      fontSize: 12,
    },
    num2:{
      position: 'absolute',
      right: 60,
      left:7,
      fontFamily: 'Montserrat-ExtraBold',
      fontSize: 22,
      color: '#1FB2AC',
    },
    min2:{
      position: 'absolute',
      left: 76,
      top: 1,
      fontFamily: 'Montserrat-SemiBold',
      fontSize: 22,
      textAlign: 'center',
      color: '#000',
    },
    textf:{
      bottom: -109,
    },
    tram2:{
      bottom:  Platform.OS === 'android' ? -42 : -50,
    },
    dis:{
      position: 'absolute',
      width: 31.36,
      height: 30,
      left: 53,
      top: 18,
    },
    res:{
      position: 'absolute',
      left: 25,
      top: 59,
      fontFamily: 'Montserrat-SemiBold',
      fontSize: 18,
      color: '#000',
    },
    par:{
      position: 'absolute',
      left: 13,
      top: 45,
      fontFamily: 'Montserrat-SemiBold',
      fontSize: 22,
      textAlign: 'center',
      color: '#807E7E',
    },
    
    //
});