import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import DayRatingChart from './DayRatingChart';
import WeatherChart from './WeatherChart';
import StreakChart from './StreakChart';
import ProductivityChart from './ProductivityChart';
import WakingChart from './WakingChart';
import ExerciseChart from './ExerciseChart';
import { firebase } from '../firebase.js';

export function Charts({navigation, route}) {
  
  // Make input later
  const name = route.params.name;
  const [entry, setEntry] = useState([]);

  useEffect(() => {
    const db = firebase.database().ref();
    const handleData = snap => {
      if (snap.val() && name in snap.val()) setEntry(snap.val()[name]);
      else setEntry([]);
    }
    db.on('value', handleData, error => alert(error));
    return () => { db.off('value', handleData); };
  }, []);

  var data = [];
  for (var id in entry) {
    data.push(entry[id]);
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.scrollview}>
        <Text style={styles.topText}>Charts</Text>
        {DayRatingChart(data)}
        {WeatherChart(data)}
        {StreakChart(data)}
        {ProductivityChart(data)}
        {WakingChart(data)}
        {ExerciseChart(data)}
        <TouchableOpacity onPress={()=>navigation.navigate('Home')} style={styles.button}>
                <Text style={styles.buttonText}>Return to Home</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )

}

const styles = StyleSheet.create({
  scrollview: {
    backgroundColor: '#ffffff',
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
  },
  button: {
    borderColor: '#0099cc',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 6,
    backgroundColor: '#ffffff'
  },
});
