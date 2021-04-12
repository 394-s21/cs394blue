import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native'
import { LineChart, BarChart, ContributionGraph } from 'react-native-chart-kit';
import { Weather, DayRating, Exercise, Wake } from '../questions/Questions';

import { firebase } from '../fire';

export function Charts({navigation}) {
  
  // Make input later
  var name = "entries";
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

  return (
    <SafeAreaView>
      <ScrollView style={styles.scrollview}>
        <Text style={styles.topText}>Charts</Text>
        {DayRatingChart(entry)}
        {WeatherChart(entry)}
        {StreakChart(entry)}
        <TouchableOpacity onPress={()=>navigation.navigate('Home')} style={styles.button}>
                <Text style={styles.buttonText}>Return to Home</Text>
            </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
  
}

function DayRatingChart(data) {
  if(!data.length) {
    return;
  }

  // TODO: Make number of days be an input
  const numDays = 7;
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const endDate = new Date();
  let startDate = new Date();
  startDate.setDate(endDate.getDate() - numDays + 1);

  let date = startDate;
  let labels = [];
  let dailyRatings = [];

  // Loop through entries by date and fetch data
  for (let i = 0; i < numDays; i++) {
    labels.push(daysOfWeek[date.getDay()])
    let entry = data.find(e => {
      let entryDate = new Date(e.date.replace(/-/g, '/'))
      entryDate.setHours(0, 0, 0, 0)
      date.setHours(0, 0, 0, 0)
      return entryDate.valueOf() === date.valueOf();
    })
    if (entry) {
      dailyRatings.push(entry.dailyRating);
    }
    else {
      dailyRatings.push(0);
    }

    // Increment date
    date.setDate(date.getDate() + 1);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.buttonText}>Daily Ratings</Text>
      <LineChart
        data={{
          labels: labels,
          datasets: [
            {
              data: dailyRatings,
              strokeWidth: 1
            },
            {
              // Set max y value in graph by creating invisible data point
              data: [10],
              color: () => 'rgba(0, 0, 0, 0)'
            }
          ]
        }}
        fromZero={true}
        segments={5}
        // withInnerLines={false}
        withVerticalLines={false}
        width={Dimensions.get("window").width}
        height={250}
        chartConfig={{
          backgroundGradientFromOpacity: 0,
          backgroundGradientToOpacity: 0,
          decimalPlaces: 0,
          color: () => '#ffffff',
        }}
      />
    </View>
  )
}

function WeatherChart(data) {
  if(!data.length) {
    return;
  }

  // TODO: Make number of days be an input
  const numDays = 7;
  const endDate = new Date();
  let startDate = new Date();
  startDate.setDate(endDate.getDate() - numDays + 1);

  let date = startDate;
  // Keep track of [sum, count]
  let values = {
    "sunny": [0, 0],
    "cloudy": [0, 0],
    "rainy": [0, 0],
    "snowy": [0, 0],
    "unknown": [0, 0],
    "max": [10, 1]
  }

  // Loop through entries by date and fetch data
  for (let i = 0; i < numDays; i++) {
    let entry = data.find(e => {
      let entryDate = new Date(e.date.replace(/-/g, '/'))
      entryDate.setHours(0, 0, 0, 0)
      date.setHours(0, 0, 0, 0)
      return entryDate.valueOf() === date.valueOf();
    })
    if (entry) {
      values[entry.weather][0] += entry.dailyRating;
      values[entry.weather][1] += 1;
    }

    // Increment date
    date.setDate(date.getDate() + 1);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.buttonText}>How Weather Affected Your Day</Text>
      <BarChart
        data={{
          labels: Object.keys(values).map(k => k[0].toUpperCase() + k.substr(1)),
          datasets: [
            {
              // TODO: Find workaround for setting max y value
              // If no values are recorded for the option return 0
              data: Object.values(values).map(v => v[1] !== 0 ? v[0]/v[1] : 0)
            }
          ]
        }}
        fromZero={true}
        segments={5}
        // withInnerLines={false}
        withVerticalLines={false}
        width={Dimensions.get("window").width}
        height={300}
        chartConfig={{
          backgroundGradientFromOpacity: 0,
          backgroundGradientToOpacity: 0,
          decimalPlaces: 0,
          color: () => '#ffffff',
        }}
      />
    </View>
  )
}

function StreakChart(data) {

  if(!data.length) {
    return;
  }

  // TODO: Make number of days be an input
  const numDays = 70;
  const endDate = new Date();
  let startDate = new Date();
  startDate.setDate(endDate.getDate() - numDays + 1);

  let date = startDate;
  // Set range values
  let listDates = [
    {date: "2000-01-01", count: 0},
    {date: "2000-01-02", count: 1}
  ]

  // Loop through entries by date and fetch data
  for (let i = 0; i < numDays; i++) {
    let entry = data.find(e => {
      let entryDate = new Date(e.date.replace(/-/g, '/'))
      entryDate.setHours(0, 0, 0, 0)
      date.setHours(0, 0, 0, 0)
      return entryDate.valueOf() === date.valueOf();
    })
    if (entry) {
      listDates.push({date: entry.date, count: 1});
    }

    // Increment date
    date.setDate(date.getDate() + 1);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.buttonText}>Your Progress</Text>
      <ContributionGraph
        values={listDates}
        endDate={endDate}
        numDays={numDays}
        width={Dimensions.get("window").width}
        height={200}
        chartConfig={{
          backgroundGradientFromOpacity: 0,
          backgroundGradientToOpacity: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: () => '#ffffff',
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0099cc',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  },
  scrollview: {
    backgroundColor: '#ffffff',
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
  },
  button: {
    borderColor: '#0099cc',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 6,
    backgroundColor: '#ffffff'
  }
});
