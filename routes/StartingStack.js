import React  from 'react';

  import { createStackNavigator } from '@react-navigation/stack';
  const Stack = createStackNavigator();
 
  import { NavigationContainer } from '@react-navigation/native';
  
  import home from '../screens/Home' //home screen
  import Starting from '../screens/Starting' //starting sreen 

export default function StartingStack() {
  return (
 
    <NavigationContainer>
     <Stack.Navigator >
     <Stack.Screen
        name="Starting"
        component={Starting}
      />
      <Stack.Screen
        name="home" 
        component={home} 
      />
    </Stack.Navigator>
    </NavigationContainer>
  );}