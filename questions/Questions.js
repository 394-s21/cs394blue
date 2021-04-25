//import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import ButtonQuestion from './components/ButtonQuestion';
import SliderQuestion from './components/SliderQuestion';
import {firebase} from '../firebase.js';
//import { TabRouter } from '@react-navigation/routers';

function logToday(name, today, navigation, id, firstQuestion) {
    if(!id) {
        const date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();;
        var newref = firebase.database().ref(name).push();
        newref.set({
            dailyRating: 0,
            date: date,
            exercise: true,
            wakeupTime: '8:00-9:30',
            weather: 'sunny'
        });
        id = newref.key;
    }
    navigation.navigate(firstQuestion,{id, name});
}

export function LogStart({navigation}) {
    // Will change to input
    var name = "entries";
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        const db = firebase.database().ref();
        const handleData = snap => {
            if (snap.val() && name in snap.val()) setEntries(snap.val()[name]);
            else setEntries([]);
        }
        db.on('value', handleData, error => alert(error));
        return () => { db.off('value', handleData); };
    }, []);

    var data = [];
    for (var id in entries) {
      var temp = entries[id];
      temp["id"] = id;
      data.push(temp);
    }

    const today = new Date();
    var id = null;

    let entry = data.find(e => {
        let entryDate = new Date(e.date.replace(/-/g, '/'));
        entryDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        return entryDate.valueOf() === today.valueOf();
      })

    if(entry) {
       id = entry["id"];
    }

    // Will be input
    var firstQuestion = 'Weather';

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={()=>logToday(name, today, navigation, id, firstQuestion)} style={styles.button}>
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
    const name = route.params.name;
    return (
        <ButtonQuestion
            name={name}
            question="How was the weather today?"
            options={["Sunny", "Cloudy", "Rainy", "Snow", "Don't know because I never left the house"]}
            next={(str) => navigation.navigate('Exercise', {id, name})}
            questionId = 'weather'
            id = {id}
        />
    )
}

export function Exercise({navigation, route}) {
    const id = route.params.id;
    const name = route.params.name;
    return(
        <ButtonQuestion
            name={name}
            question="Did you exercise today?"
            options={["Yes", "No"]}
            next={(str) => navigation.navigate('Wake',{id, name})}
            questionId = 'exercise'
            id = {id}
        />
    )
}

export function Wake({navigation, route}) {
    const id = route.params.id;
    const name = route.params.name;
    return (
        <ButtonQuestion
            name={name}
            question="What time did you wake up today?"
            options={["5:00 - 6:30 AM", "6:30 - 8:00 AM", "8:00 - 9:30 AM",
                "9:30 - 11:00 AM", "11:00 - 12:30 PM", "After 12:30 PM"]}
            next={(str) => navigation.navigate('DayRating',{id, name})}
            questionId = 'wake'
            id = {id}
        />
    )
}

export function DayRating({navigation, route}) {
    const id = route.params.id;
    const name = route.params.name;
    return (
        <SliderQuestion
            name={name}
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
        fontFamily: 'roboto-regular'
    }
});
