import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';

export default function ButtonQuestion(props) {
    return (
        <View style={styles.container}>
            <Text>{props.question}</Text>
            {renderButtons(props.options, props.next)}
        </View>
    )
}

const renderButtons = (options, next) => {
    return options.map((option, index) => (
        <Button title={option} onPress={next} key={index}/>
    ))
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
