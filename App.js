import React from 'react';
import { Weather, DayRating, Exercise, Wake, LogStart, Productivity } from './questions/Questions';
import * as Font from 'expo-font';
import { StyleSheet } from 'react-native';
import { Charts } from './charts/Charts';
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
  },[])

    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home"
          component={LogStart}/>
          <Stack.Screen name="Weather"
          component={Weather}/>
          <Stack.Screen name="Exercise"
          component={Exercise}/>
          <Stack.Screen name="Wake"
          component={Wake} />
          <Stack.Screen name="DayRating"
          component={DayRating}/>
          <Stack.Screen name="Productivity"
          component={Productivity} />
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
