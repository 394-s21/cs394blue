import React from 'react';
import { Text, View, Dimensions, StyleSheet} from 'react-native'
import { BarChart } from 'react-native-chart-kit';

export default function WeatherChart(data) {
  console.log(data)
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0099cc',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'roboto-regular'
  },
  
});