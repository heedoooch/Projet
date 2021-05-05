import React, {Component} from 'react';
import {StyleSheet, ScrollView, View, Text, Image} from 'react-native';


export default function offers({navigation}) {

    return(
    <ScrollView>
      <View style = {styles.itemRow}>
         <Image source ={require('../assets/card.png')} style ={styles.itemImage} />
         <Text style={styles.itemText}>Abonnement TAWASSOL CLASSIC</Text>
         <Text style={styles.itemText}>1000DA/mois</Text>

         <Image source ={require('../assets/kids.jpg')} style ={styles.itemImage} />
         <Text style={styles.itemText}>Abonnement TAWASSOL JUNIOR</Text>
         <Text style={styles.itemText}>840DA/mois</Text>

         <Image source ={require('../assets/old.jpg')} style ={styles.itemImage} />
         <Text style={styles.itemText}>Abonnement TAWASSOL SENIOR</Text>
         <Text style={styles.itemText}>720DA/mois</Text>

         <Image source ={require('../assets/college.jpg')} style ={styles.itemImage} />
         <Text style={styles.itemText}>Abonnement TAWASSOL DJAMI3I</Text>
         <Text style={styles.itemText}>600DA/mois</Text>
      </View>
    
    </ScrollView>
      
    )
  }

 const styles = StyleSheet.create({
   container: {
     marginTop: 20,
     backgroundColor: '#f5fcff',
   },
   itemRow:{
     borderBottomColor: '#ccc',
     marginBottom:10,
     borderBottomWidth: 1
   },
   itemText:{
     fontSize: 16,
     padding: 5
   },
   itemImage:{
     width:'100%',
     height:200,
     resizeMode:'cover',
   }
 })