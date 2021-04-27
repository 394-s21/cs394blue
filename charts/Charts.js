import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native'
import { LineChart, BarChart, ContributionGraph, ProgressChart } from 'react-native-chart-kit';
//import { Weather, DayRating, Exercise, Wake } from '../questions/Questions';

import { firebase } from '../firebase.js';

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
      <Text style={styles.description}>How you rated your days for the past 7 days</Text>
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
    "snow": [0, 0],
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
      values[entry.weather.toLowerCase()][0] += entry.dailyRating;
      values[entry.weather.toLowerCase()][1] += 1;
    }

    // Increment date
    date.setDate(date.getDate() + 1);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.buttonText}>Weather</Text>
      <Text style={styles.description}>How Weather Affected Your Day</Text>
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
  const numDays = 7;
  const endDate = new Date();
  let startDate = new Date();
  startDate.setDate(endDate.getDate() - numDays + 1);

  let date = startDate;
  // Set range values
  let listDates = [
    {date: "2000-01-01", count: 0},
    {date: "2000-01-02", count: 1}
  ]

  //code for progress chart
  var count = 0;

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
      count++;
    } else {

    }

    // Increment date
    date.setDate(date.getDate() + 1);
  }

  const streakPercentage = count / numDays;
  const progressData = {
    labels: ["Streak"],
    data: [streakPercentage]
  };

  const Days = () => {
    return (<View style={styles.dayBox}>
      {/* <Text>{date}</Text>
      <Text>{day}</Text> */}
    </View>)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.buttonText}>Your Streak</Text>
      <Text style={styles.description}>The percentage of days you logged in the past week is lit up</Text>
      {/* <View style={styles.daysContainer}>
        <Days />
        <Days />
        <Days />
        <Days />
        <Days />
        <Days />
        <Days />
      </View>
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
      /> */}
      <ProgressChart
        data={progressData}
        width={Dimensions.get("window").width}
        height={300}
        strokeWidth={40}
        radius={100}
        chartConfig = {{
          backgroundGradientFrom: "#1E2923",
          backgroundGradientFromOpacity: 0,
          backgroundGradientTo: "#08130D",
          backgroundGradientToOpacity: 0.5,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          strokeWidth: 3, // optional, default 3
          barPercentage: 0.5,
          useShadowColorFromDataset: false // optional
        }}
        hideLegend={true}
      />
    </View>
  )
}

function ProductivityChart(data) {

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
  let productivity = [];

  // Loop through entries by date and fetch data
  for (let i = 0; i < numDays; i++) {
    labels.push(daysOfWeek[date.getDay()])
    let entry = data.find(e => {
      let entryDate = new Date(e.date.replace(/-/g, '/'))
      entryDate.setHours(0, 0, 0, 0)
      date.setHours(0, 0, 0, 0)
      return entryDate.valueOf() === date.valueOf();
    })
    if (entry && entry.productivity) {
      productivity.push(entry.productivity);
    }
    else {
      productivity.push(0);
    }

    // Increment date
    date.setDate(date.getDate() + 1);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.buttonText}>Productivity</Text>
      <Text style={styles.description}>How productive you were over the last week</Text>
      <LineChart
        data={{
          labels: labels,
          datasets: [
            {
              data: productivity,
              strokeWidth: 1
            },
            {
              // Set max y value in graph by creating invisible data point
              data: [5],
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

function WakingChart(data) {
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
    "5:00 - 6:30 AM": 0,
    "6:30 - 8:00 AM": 0,
    "8:00 - 9:30 AM": 0,
    "9:30 - 11:00 AM": 0,
    "11:00 - 12:30 PM": 0,
    "After 12:30 PM": 0
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
      values[entry.wakeupTime] += 1;
    }

    // Increment date
    date.setDate(date.getDate() + 1);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.buttonText}>Wakeup Time</Text>
      <Text style={styles.description}>Times that you woke up this week</Text>
      <BarChart
        data={{
          labels: Object.keys(values),
          datasets: [
            {
              // TODO: Find workaround for setting max y value
              // If no values are recorded for the option return 0
              data: Object.values(values)
            }
          ]
        }}
        fromZero={true}
        // segments={Math.max(Object.values(values))}
        segments={Object.values(values).reduce((a, b) => a > b ? a : b)}
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
  dayBox: {
    width: '10%',
    height: 100,
    backgroundColor: 'rgb(255,255,255)',
    margin:20
  },
  daysContainer: {
    width: '100%',
    flexDirection:'row',
    padding: 10
  }
});
