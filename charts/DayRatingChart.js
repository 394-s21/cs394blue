import React from 'react';
import { Text, View, Dimensions, StyleSheet} from 'react-native'
import { LineChart} from 'react-native-chart-kit';

export default function DayRatingChart(data) {

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