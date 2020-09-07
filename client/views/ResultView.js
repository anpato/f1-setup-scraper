import React from 'react'
import { View, ScrollView, Text, StyleSheet } from 'react-native'
import { useRecoilValue } from 'recoil'
import { RaceResults, QualifyingResults } from '../store/atoms'

export default () => {
  const qualiResults = useRecoilValue(QualifyingResults)
  const raceResults = useRecoilValue(RaceResults)
  return (
    <ScrollView>
      <Text>Qualifying Results</Text>
      {qualiResults &&
        qualiResults.map((result) => (
          <View key={result.Driver.code} style={styles.driverCard}>
            <View style={styles.cardHeader}>
              <Text
                style={styles.primaryText}
              >{`${result.Driver.givenName} ${result.Driver.familyName} ${result.number}`}</Text>
              <Text style={styles.primaryText}>P{result.position}</Text>
            </View>
            <View style={styles.qualiSection}>
              <View style={styles.qualiList}>
                <Text style={styles.qualiInfo}>Q1</Text>
                <Text>{result.Q1 || 'No Time'}</Text>
              </View>
              <View style={styles.qualiList}>
                <Text style={styles.qualiInfo}>Q2</Text>
                <Text>{result.Q2 || 'No Time'}</Text>
              </View>
              <View style={styles.qualiList}>
                <Text style={styles.qualiInfo}>Q3</Text>
                <Text>{result.Q3 || 'No Time'}</Text>
              </View>
            </View>
          </View>
        ))}
      {raceResults &&
        raceResults.map((result) => (
          <View key={result.Driver.code} style={styles.driverCard}>
            <View style={styles.cardHeader}>
              <Text
                style={styles.primaryText}
              >{`${result.Driver.givenName} ${result.Driver.familyName} ${result.number}`}</Text>
              <Text style={styles.primaryText}>P{result.position}</Text>
            </View>
            <View style={styles.qualiSection}>
              <Text>{result.FastestLap.Time.time}</Text>
              <Text>{result.grid}</Text>
              <Text>{result.points}</Text>
            </View>
          </View>
        ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  driverCard: {
    padding: 10
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomColor: 'rgba(0,0,0,0.2)',
    borderBottomWidth: 2
  },
  qualiSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10
  },
  primaryText: {
    fontSize: 20
  },
  qualiList: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  qualiStage: {},
  qualiInfo: {
    marginVertical: 5
  }
})
