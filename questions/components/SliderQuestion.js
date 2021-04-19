import React,{ useState } from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import {firebase} from '../../fire';

function updateField(next, rating, questionId, id){
    if (questionId === 'day_rating'){
        //console.log('entries/'+id)
        firebase.database().ref('entries/'+id).update({
            dailyRating: rating
        });
    }
    //add other questions here
    next();
}

export default function SliderQuestion(props) {

    const [sliderValue, setSliderValue] = useState(0)

    return (
        <View style={styles.container}>
            <Text style={styles.topText}>{props.question}</Text>
            <Text style={styles.topText}>{sliderValue}</Text>            
            <Slider
                style={{width: 350, height: 40}}
                minimumValue={props.min}
                maximumValue={props.max}
                step={props.step}
                thumbTintColor='rgb(255,255,255)'
                minimumTrackTintColor='rgb(255,255,255)'
                onValueChange={(value) => {
                    setSliderValue(value)
                    }}
            />
            <TouchableOpacity style={styles.button} onPress={()=>updateField(props.next,sliderValue,props.questionId,props.id)}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </View>
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
        borderWidth: 6,
        backgroundColor: '#ffffff'
    },

    topText: {
        fontSize: 32,
        textAlign: 'center',
        paddingBottom: 20,
        fontFamily: 'Futura-CondensedExtraBold'
    },

    buttonText: {
        fontSize: 35,
        textAlign: 'center',
        fontFamily: 'Futura'
    }
});
