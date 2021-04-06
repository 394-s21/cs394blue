import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollableList, TextInput, Button } from 'react-native';
import ButtonQuestion from './components/ButtonQuestion'
import SliderQuestion from './components/SliderQuestion'

export function Weather({navigation}) {
    return (
        <ButtonQuestion
            question="How was the weather today?"
            options={["Sunny", "Cloudy", "Rainy", "Snow", "Don't know because I never left the house"]}
            next={(str) => navigation.navigate('DayRating')}
        />
    )
}

export function DayRating({navigation}) {
    return (
        <SliderQuestion
            question="How was your day today?"
            min={0}
            max={10}
            step={1}
            next={(str) => navigation.navigate('Exercise')}
        />
    )
}

export function Exercise({navigation}) {
    return(
        <ButtonQuestion
            question="Did you exercise today?"
            options={["Yes", "No"]}
            next={(str) => navigation.navigate('Wake')}
        />
    )
}

export function Wake({navigation}) {
    return (
        <ButtonQuestion
            question="What time did you wake up today?"
            options={["5:00 - 6:30 AM", "6:30 - 8:00 AM", "8:00 - 9:30 AM",
                "9:30 - 11:00 AM", "11:00 - 12:30 PM", "After 12:30 PM"]}
            next={(str) => navigation.navigate('Wake')}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
