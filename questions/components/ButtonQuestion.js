import React from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import {firebase} from '../../fire';

export default function ButtonQuestion(props) {
    return (
        <View style={styles.container}>
            <Text style={styles.topText}>{props.question}</Text>
            {renderButtons(props.options, props.next, props.questionId, props.id)}
        </View>
    )
}

function updateField(option, questionId, id){
    if (questionId === 'weather'){
        //console.log('entries/'+id)
        firebase.database().ref('entries/'+id).update({
            weather: option
        });
    } 
    //add other questions in here
}

const renderButtons = (options, next, questionId, id) => {
    
    return options.map((option, index) => (
        <View key={index} style={{paddingTop: 15, paddingBottom: 15, width: "75%"}}>
            <TouchableOpacity onPress={()=>{next;updateField(option,questionId, id)}} style={styles.button}>
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
        fontFamily: 'Futura-CondensedExtraBold'
    },

    buttonText: {
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'Futura'
    }
});
