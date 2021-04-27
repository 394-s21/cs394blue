import React from 'react';
import * as Font from 'expo-font';
import { StyleSheet,Button } from 'react-native';
import { Weather, DayRating, Exercise, Wake, LogStart } from './questions/Questions';
import { Charts } from './charts/Charts';
import Login from './signin/Login';
import Register from './signin/Register';
import {firebase} from './firebase.js'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect } from 'react';

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    Font.loadAsync({
      'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
      'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
      'roboto-thin': require('./assets/fonts/Roboto-Thin.ttf')
    })
  }, [])

  function logOut(navigation) {
    firebase.auth().signOut()
    navigation.navigate("Login")
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login"
          component={Login} />
        <Stack.Screen name="Register"
          component={Register} />
        <Stack.Screen name="Home"
          component={LogStart}
          options={({navigation}) => 
          ({headerRight: () => (
          <Button 
          title="LogOut"
          onPress={() =>logOut(navigation) }/>)})}
          />
          <Stack.Screen name="Weather"
          component={Weather} />
        <Stack.Screen name="Exercise"
          component={Exercise} />
        <Stack.Screen name="Wake"
          component={Wake} />
        <Stack.Screen name="DayRating"
          component={DayRating} />
        <Stack.Screen name="Charts"
          component={Charts} />
      </Stack.Navigator>
    </NavigationContainer>
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
