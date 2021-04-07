import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import Slider from '@react-native-community/slider';

export default function SliderQuestion(props) {
    return (
        <View style={styles.container}>
            <Text>{props.question}</Text>
            <Slider
                style={{width: 250, height: 40}}
                minimumValue={props.min}
                maximumValue={props.max}
                step={props.step}
            />
            <Button title="Submit" onPress={props.next}></Button>
        </View>
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
