import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function ButtonQuestion(props) {
    return (
        <View style={styles.container}>
            <Text style={styles.topText}>{props.question}</Text>
            {renderButtons(props.options, props.next)}
        </View>
    )
}

const renderButtons = (options, next) => {
    return options.map((option, index) => (
        <View key={index} style={{paddingTop: 15, paddingBottom: 15, width: "75%"}}>
            <TouchableOpacity onPress={next} style={styles.button}>
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
        // fontFamily: 'Futura-CondensedExtraBold'
    },

    buttonText: {
        fontSize: 18,
        textAlign: 'center',
        // fontFamily: 'Futura'
    }
});
