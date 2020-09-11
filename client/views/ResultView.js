import React, { useEffect } from 'react'
import { View, ScrollView, Text, StyleSheet, Dimensions } from 'react-native'
import { useRecoilValue } from 'recoil'
import { RaceResults, QualifyingResults } from '../store/atoms'
import { GetQualiInfo, GetRaceResults } from '../services'
import { useNavigation } from '@react-navigation/native'

export default ({ round }) => {
  const navigation = useNavigation()
  const qualiResults = useRecoilValue(QualifyingResults)
  const raceResults = useRecoilValue(RaceResults)
  useEffect(() => {
    async function results() {
      const qResults = await GetQualiInfo(round)
      const rResults = await GetRaceResults(round)
    }
  })
  return (
    <ScrollView
      horizontal
      contentContainerStyle={{ width: `${100 * 2}%`, borderTopRightRadius: 20 }}
      showsHorizontalScrollIndicator={false}
      decelerationRate="fast"
      pagingEnabled
    >
      <View
        style={{
          width: Dimensions.get('screen').width,
          borderTopRightRadius: 20
        }}
      >
        <ScrollView
          contentContainerStyle={{}}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.primaryText}>Qualifying Results</Text>
          </View>
          {qualiResults &&
            qualiResults.map((result, index) => (
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
        </ScrollView>
      </View>
      <View style={{ width: '100%' }}>
        <ScrollView
          contentContainerStyle={{ width: Dimensions.get('screen').width }}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.primaryText}>Race Results</Text>
          </View>

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
                  <View style={styles.qualiList}>
                    <Text style={styles.qualiInfo}>Fastest Lap</Text>
                    <Text>
                      {result.FastestLap ? result.FastestLap.Time.time : 'DNF'}
                    </Text>
                  </View>
                  <View style={styles.qualiList}>
                    <Text style={styles.qualiInfo}>Grid Position</Text>
                    <Text>{result.grid}</Text>
                  </View>
                  <View style={styles.qualiList}>
                    <Text style={styles.qualiInfo}>Points Scored</Text>
                    <Text>{result.points}</Text>
                  </View>
                </View>
              </View>
            ))}
        </ScrollView>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  driverCard: {
    padding: 10
  },
  sectionHeader: {
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: 'rgba(0,0,0,0.2)',
    borderBottomWidth: 2
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
