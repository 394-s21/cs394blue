import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { BarChart } from 'react-native-chart-kit';


export default function WakingChart(data) {
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
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 10,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'roboto-regular'
  },
});