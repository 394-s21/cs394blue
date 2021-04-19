import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import ButtonQuestion from './components/ButtonQuestion';
import SliderQuestion from './components/SliderQuestion';
import {firebase} from '../fire';
import { TabRouter } from '@react-navigation/routers';


function logToday(navigation){
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();;
    var newref = firebase.database().ref('entries').push();
    console.log(newref);
    newref.set({
        dailyRating: 0,
        date: date,
        exercise: true,
        wakeupTime: '8:00-9:30',
        weather: 'sunny'
    });
    const id = newref.key;
    navigation.navigate('Weather',{id});
}

export function LogStart({navigation}) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={()=>logToday(navigation)} style={styles.button}>
                <Text style={styles.buttonText}>Log Today</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('Charts')} style={styles.button}>
                <Text style={styles.buttonText}>Charts</Text>
            </TouchableOpacity>
        </View>

    )
}

export function Weather({navigation, route}) {
    const id = route.params.id;
    return (
        <ButtonQuestion
            question="How was the weather today?"
            options={["Sunny", "Cloudy", "Rainy", "Snow", "Don't know because I never left the house"]}
            next={(str) => navigation.navigate('Exercise', {id})}
            questionId = 'weather'
            id = {id}
        />
    )
}

export function Exercise({navigation, route}) {
    const id = route.params.id;
    return(
        <ButtonQuestion
            question="Did you exercise today?"
            options={["Yes", "No"]}
            next={(str) => navigation.navigate('Wake',{id})}
            questionId = 'exercise'
            id = {id}
        />
    )
}

export function Wake({navigation, route}) {
    const id = route.params.id;
    return (
        <ButtonQuestion
            question="What time did you wake up today?"
            options={["5:00 - 6:30 AM", "6:30 - 8:00 AM", "8:00 - 9:30 AM",
                "9:30 - 11:00 AM", "11:00 - 12:30 PM", "After 12:30 PM"]}
            next={(str) => navigation.navigate('DayRating',{id})}
            questionId = 'wake'
            id = {id}
        />
    )
}

export function DayRating({navigation, route}) {
    const id = route.params.id;
    return (
        <SliderQuestion
            question="How was your day today?"
            min={0}
            max={10}
            step={1}
            next={(str) => navigation.navigate('Charts')}
            questionId = 'day_rating'
            id = {id}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0099cc',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        borderColor: '#ffffff',
        alignItems: 'center',
        borderRadius: 12,
        borderWidth: 10,
        backgroundColor: '#ffffff',
        margin: 20,
    },
    buttonText: {
        fontSize: 30,
        textAlign: 'center',
        fontFamily: 'Futura'
    }
});
