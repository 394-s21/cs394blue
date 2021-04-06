import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { LineChart } from 'react-native-chart-kit';

export function DayRatingChart() {
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
          color: () => 'rgba(26, 255, 146, 1)',
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
});
