import React from 'react';
import { Weather, DayRating, Exercise, Wake, LogStart, Productivity } from './questions/Questions';
import * as Font from 'expo-font';
import { StyleSheet, Button } from 'react-native';
import { Charts } from './charts/Charts';
import Login from './signin/Login';
import Register from './signin/Register';
import { firebase } from './firebase.js'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { CommonActions } from '@react-navigation/native';

import { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import 
{LoginScreen, RegisterScreen} from './signin/screens';

function LogScreen() {


  function logOut(navigation) {
    firebase.auth().signOut()
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          { name: 'Auth' }
        ],
      })
    );
  }

  return (
    <Stack.Navigator>
        <Stack.Screen name="Home"
          component={LogStart}
          options={({ navigation }) =>
          ({
            headerRight: () => (
              <Button
                title="Log Out"
                onPress={() => logOut(navigation)} />)
          })}
        />
        <Stack.Screen name="Weather"
          component={Weather} />
        <Stack.Screen name="Exercise"
          component={Exercise} />
        <Stack.Screen name="Wake"
          component={Wake} />
        <Stack.Screen name="DayRating"
          component={DayRating} />
        <Stack.Screen name="Productivity"
          component={Productivity} />
    </Stack.Navigator>
  );
}

function ChartsScreen() {
  return (
    {Charts}
  );
}

function UserScreen() {
  return (
    <Stack.Navigator>
        <Stack.Screen name="LoginScreen"
          component={LoginScreen} />
        <Stack.Screen name="RegisterScreen"
          component={RegisterScreen} />
    </Stack.Navigator>
  );
}

function Tabs(){
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Log') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
          } else if (route.name === 'Charts') {
            iconName = focused ? 'ios-list' : 'ios-list';
          } /*else if (route.name === 'User') {
            iconName = focused ? 'ios-list' : 'ios-list';
          }*/
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#0099cc',
        inactiveTintColor: 'gray',
      }}
      >
        <Tab.Screen name="Log" component={LogScreen} />
        <Tab.Screen name="Charts" component={Charts} />
        {/*<Tab.Screen name="User" component={UserScreen} />*/}
      </Tab.Navigator>
  );
}

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    Font.loadAsync({
      'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
      'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
      'roboto-thin': require('./assets/fonts/Roboto-Thin.ttf')
    })
  }, [])

  

  return (
    <>
    <NavigationContainer>

    <Stack.Navigator screenOptions={{headerShown: false}}>

    <Stack.Screen name="Auth"
          component={UserScreen} />
    <Stack.Screen name="Tabs"
          component={Tabs} />

    </Stack.Navigator>

    </NavigationContainer>
    </>
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
