import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import {firebase} from '../../firebase.js';

export default function ButtonQuestion(props) {

    return (
        <View style={styles.container}>
            <Text style={styles.topText}>{props.question}</Text>
            {renderButtons(props.name, props.options, props.next, props.questionId, props.id)}
        </View>
    )
}

function updateField(name, next, option, questionId, id){
    if (questionId === 'weather'){
        if(option === "Don't know because I never left the house") {
            option = 'unknown';
        }
        firebase.database().ref(name+'/'+id).update({
            weather: option
        });
    } else if (questionId === 'exercise'){
        if (option === 'No'){
            firebase.database().ref(name+'/'+id).update({
                exercise: false
            });
        }
    } else if (questionId === 'wake'){
        firebase.database().ref(name+'/'+id).update({
            wakeupTime: option
        });
    }
    //add other questions here
    next();
}

const renderButtons = (name, options, next, questionId, id) => {
    
    return options.map((option, index) => (
        <View key={index} style={{paddingTop: 15, paddingBottom: 15, width: "75%"}}>
            <TouchableOpacity onPress={()=>updateField(name, next, option, questionId, id)} style={styles.button}>
                <Text style={styles.buttonText}>{option}</Text>
            </TouchableOpacity>
        </View>
    ))
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
        borderWidth: 6,
        backgroundColor: '#ffffff'
    },

    topText: {
        fontSize: 24,
        textAlign: 'center',
        paddingBottom: 20,
        fontFamily: 'roboto-bold'
    },

    buttonText: {
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'roboto-regular'
    }
});
