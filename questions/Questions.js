import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollableList, TextInput, Button } from 'react-native';

export function Weather({navigation}) {
    return (
        <View style={styles.container}>
            <Text>How was the weather today?</Text>
            <Button title="Sunny" onPress={() => navigation.navigate('Exercise')}></Button>
            <Button title="Cloudy" onPress={() => navigation.navigate('Exercise')}></Button>
            <Button title="Rainy" onPress={() => navigation.navigate('Exercise')}></Button>
            <Button title="Snow" onPress={() => navigation.navigate('Exercise')}></Button>
            <Button title="Don't Know cause I never Left the House" 
            onPress={() => navigation.navigate('Exercise')}></Button>

        </View>
    )
}

export function Exercise({navigation}) {
    return(
        <View style={styles.container}>
            <Text>Did you exercise today?</Text>
              <Button title="Yes" onPress={() => navigation.navigate('Wake')}></Button>
              <Button title="No" onPress={() => navigation.navigate('Wake')}></Button>
        </View>
    )
}

export function Wake() {
    return (
        <View style={styles.container}>
            <Text>What time did you wake up today?</Text>
            <Button title="5-6:30AM"></Button>
            <Button title="6:30-8AM"></Button>
            <Button title="8-9:30AM"></Button>
            <Button title="8-9:30AM"></Button>
            <Button title="11AM-12PM"></Button>
            <Button title="After 12PM"></Button>
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