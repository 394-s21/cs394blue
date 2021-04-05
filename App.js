import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
    return (
        <View style={styles.container}>
            <Text>Life Capsule</Text>
            <Text>Zain's line</Text>
            <Text>Si Woo's line</Text>
            <Text> Ikenna's line</Text>
            <Text>Darryl's line</Text>
            <Text>Melia's line</Text>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
