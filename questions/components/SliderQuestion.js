import React from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';

export default function SliderQuestion(props) {
    return (
        <View style={styles.container}>
            <View style={{paddingBottom: 20}}>
                <Text style={styles.topText}>{props.question}</Text>
            </View>
            <Slider
                style={{width: 350, height: 40}}
                minimumValue={props.min}
                maximumValue={props.max}
                step={props.step}
            />
            <View style={{paddingTop: 20}}>
                <TouchableOpacity style={styles.button} onPress={props.next}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
            
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
