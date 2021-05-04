import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { ProgressChart } from 'react-native-chart-kit';

export default function StreakChart(data) {

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
  var streak = [0,0,0,0,0,0,0];

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
      streak[i] = 1;
      //count++;
    } else {
    }

    // Increment date
    date.setDate(date.getDate() + 1);
  }

  var max = 0;
  var count = 0;
  for (let i=0;i<numDays;i++){
    if (streak[i]==0){
        count = 0;
    } else{
        count++;
        max = Math.max(max, count);
    }
  }

  const streakPercentage = max / numDays;
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
      <Text style={styles.buttonText}>Your Streak: {max} day(s)</Text>
      <Text style={styles.description}>The percentage of your streak over the past week is lit up</Text>
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
        chartConfig={{

            backgroundGradientFromOpacity: 0,
            backgroundGradientToOpacity: 0,
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
        hideLegend={true}
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