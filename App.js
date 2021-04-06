import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollableList, TextInput, Button } from 'react-native';
import { Weather, DayRating, Exercise, Wake } from './questions/Questions';
import { DayRatingChart } from './charts/Charts';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

export default function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Weather"
          component={Weather}/>
          <Stack.Screen name="DayRating"
          component={DayRating}/>
          <Stack.Screen name="Exercise"
          component={Exercise}/>
          <Stack.Screen name="Wake"
          component={Wake} />
          <Stack.Screen name="Charts"
          component={DayRatingChart} />
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
