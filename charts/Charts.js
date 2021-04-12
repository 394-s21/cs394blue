import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native'
import { LineChart, BarChart, ContributionGraph } from 'react-native-chart-kit';
import { Weather, DayRating, Exercise, Wake } from '../questions/Questions';

const data = require("../data.json")

export function Charts({navigation}) {
  return (
    <SafeAreaView>
      <ScrollView style={styles.scrollview}>
        <Text style={styles.topText}>Charts</Text>
        {DayRatingChart()}
        {WeatherChart()}
        {StreakChart()}
        <TouchableOpacity onPress={()=>navigation.navigate('Home')} style={styles.button}>
                <Text style={styles.buttonText}>Return to Home</Text>
            </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

function DayRatingChart() {
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
    let entry = data.entries.find(e => {
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
              // TODO: Change from test data to user data
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

function WeatherChart() {
  return (
    <View style={styles.container}>
      <Text style={styles.buttonText}>How Weather Affected Your Day</Text>
      <BarChart
        data={{
          labels: ["Sunny", "Cloudy", "Rainy", "Snowy", "IDK", "Max"],
          datasets: [
            {
              // TODO: Find workaround for setting max y value
              // TODO: Change from test data to user data
              data: [9, 7, 6, 3, 5, 10],
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

function StreakChart() {
  return (
    <View style={styles.container}>
      <Text style={styles.buttonText}>Your Progress</Text>
      <ContributionGraph
        values={[
          // Set range values
          {date: "2000-01-01", count: 0},
          {date: "2000-01-02", count: 1},
          // TODO: Change from test data to user data
          {date: "2021-03-02", count: 1},
          {date: "2021-03-03", count: 1},
          {date: "2021-03-05", count: 1},
          {date: "2021-03-06", count: 1},
          {date: "2021-03-07", count: 1},
          {date: "2021-03-10", count: 1},
          {date: "2021-03-13", count: 1},
          {date: "2021-03-14", count: 1},
          {date: "2021-03-15", count: 1},
          {date: "2021-03-22", count: 1},
          {date: "2021-03-24", count: 1},
          {date: "2021-03-30", count: 1},
          {date: "2021-03-31", count: 1},
          {date: "2021-04-02", count: 1},
          {date: "2021-04-03", count: 1},
          {date: "2021-04-05", count: 1},
          {date: "2021-04-06", count: 1},
          {date: "2021-04-07", count: 1}
        ]}
        endDate={new Date("2021-04-07")}
        numDays={70}
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
