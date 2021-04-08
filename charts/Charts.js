import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native'
import { LineChart, BarChart, ContributionGraph } from 'react-native-chart-kit';

export function Charts() {
  return (
    <ScrollView style={styles.scrollview}>
      <Text>Charts</Text>
      {DayRatingChart()}
      {WeatherChart()}
      {StreakChart()}
    </ScrollView>
  )
}

function DayRatingChart() {
  return (
    <View style={styles.container}>
      <Text>Daily Ratings</Text>
      <LineChart
        data={{
          labels: ["S", "M", "T", "W", "Th", "F", "S"],
          datasets: [
            {
              // TODO: Change from test data to user data
              data: [3, 5, 8, 9, 4, 1, 3],
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
          decimalPlaces: 0,
          color: () => 'rgba(26, 255, 146, 1)',
        }}
      />
    </View>
  )
}

function WeatherChart() {
  return (
    <View style={styles.container}>
      <Text>How Weather Affected Your Day</Text>
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
          decimalPlaces: 0,
          color: () => 'rgba(26, 255, 146, 1)',
        }}
      />
    </View>
  )
}

function StreakChart() {
  return (
    <View style={styles.container}>
      <Text>Your Progress</Text>
      <ContributionGraph
        values={[
          // Set range values
          {date: "2000-01-01", count: 0},
          {date: "2000-01-02", count: 1},
          // TODO: Change from test data to user data
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
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
      />
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
  scrollview: {
    backgroundColor: '#fff',
  }
});
