import React from 'react';
import {DrawerNavigatorItems} from 'react-navigation-drawer';
import {View, Text,ScrollView,ImageBackground,Image, StyleSheet} from 'react-native';
export default SideBar = props => (
    <ScrollView>
        <ImageBackground source={require("./backgr.jpg")} style={{ padding:16,paddingTop:38}}>
        <Image source={require("../../assets/profile.png")} style={styles.profile}/>
        <Text style={styles.name}> Full Name </Text>
        </ImageBackground>
        <View style={styles.container}>
            <DrawerNavigatorItems {...props}/>
        </View>
    </ScrollView>

);
const styles=StyleSheet.create({
    container:{
        flex:1

},
    profile:{
        width:90,
        height:90,
        borderRadius:40,
        borderColor:'white',
        borderWidth:3,
},
    name:{
        fontSize:20,
        color: "#38B497",
        fontWeight:'800',
        marginVertical:8,
        letterSpacing:1,



}
})
