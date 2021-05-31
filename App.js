import React from 'react';
import Navigator from './routes/drawer';
import Starting  from './routes/StartingStack' 
import * as firebase from 'firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function App() {
  //init firebase
                  var firebaseConfig = {
                    apiKey: "AIzaSyBES8nyG7xcMiN_WI0GhoYIYRewJ3JiiuQ",
                    authDomain: "setramadministration.firebaseapp.com",
                    databaseURL: "https://setramadministration-default-rtdb.firebaseio.com",
                    projectId: "setramadministration",
                    storageBucket: "setramadministration.appspot.com",
                    messagingSenderId: "650733919828",
                    appId: "1:650733919828:web:9c0bf179e07e5ff53dd7c1",
                    measurementId: "G-XJ2Z1Z1LQJ"
                  }; 
                    // Initialize Firebase
                    try { firebase.initializeApp(firebaseConfig); } catch {};


                    
    const [token, setToken] = React.useState(null)
    const [isLoaded, setLoaded] = React.useState(false)
    console.log(token)
    React.useEffect(() => {
        const getData = async () => {
            try {
                const token = await AsyncStorage.getItem('skipeStarting')
                if(token !== null)
                  console.log(token)
                    await setToken(token)
            } catch(e) {
            // error reading value
            throw e ;
            }
            setLoaded(true)
        }

        getData()

        return () => null
    },[])

    // this is needed so you don't have that blink from Welcome to Home (When you have a token but it's not set yet in the state)
    if(!isLoaded)
        return null

    return (
                token == null
                    ? <Starting/>
                    : <Navigator/>
                
    )
}