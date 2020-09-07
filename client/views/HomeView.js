import React, { useEffect } from 'react'
import { View, Text } from 'native-base'
import { GetCurrentSchedule, GetQualiInfo, GetRaceResults } from '../services'
import { useRecoilState } from 'recoil'
import { RaceSchedule, UpComingRace } from '../store/atoms'
import { StyleSheet, ScrollView } from 'react-native'
import moment from 'moment'
import { TouchableCard } from '../shared'
import {
  SetQualifyingResults,
  SetRaceResults
} from '../store/selectors/RaceSelectors'
import { useNavigation } from '@react-navigation/native'

export default HomeView = () => {
  const navigation = useNavigation()
  const [schedule, setSchedule] = useRecoilState(RaceSchedule)
  const [upcoming, setUpComing] = useRecoilState(UpComingRace)
  const [qR, setQualiResults] = useRecoilState(SetQualifyingResults)
  const [rR, setRaceResults] = useRecoilState(SetRaceResults)
  useEffect(() => {
    async function getSched() {
      const { raceData, upcoming } = await GetCurrentSchedule()
      setSchedule(raceData)
      setUpComing(upcoming)
    }
    getSched()
  }, [])

  const renderItem = (races) =>
    races.map((item) => (
      <TouchableCard
        key={item.round}
        styles={styles.cardItem}
        onPress={() => handleSelectRace(item.round)}
      >
        <Text style={styles.cardHeader}>{item.raceName}</Text>
        <Text>{moment(item.raceDate).format('dddd, MMMM Do YYYY')}</Text>
      </TouchableCard>
    ))

  const handleSelectRace = async (round) => {
    let qinfo = await GetQualiInfo(round)
    let rInfo = await GetRaceResults(round)
    setQualiResults(qinfo)
    setRaceResults(rInfo)
    navigation.push('Results')
  }

  return (
    <ScrollView Style={styles.container}>
      {upcoming && schedule.length ? (
        <View>
          <View>
            <View style={styles.header}>
              <Text style={styles.headerText}>Upcoming Race</Text>
            </View>
            <TouchableCard
              styles={styles.cardItem}
              onPress={() => handleSelectRace(upcoming.round)}
            >
              <Text style={styles.cardHeader}>{upcoming.raceName}</Text>
              <Text>{upcoming.circuitName}</Text>

              <Text>
                {moment(upcoming.raceDate).format('dddd, MMMM Do YYYY, h:mm a')}
              </Text>
            </TouchableCard>
          </View>
          <View>
            <View style={styles.header}>
              <Text style={styles.headerText}>Race Schedule</Text>
            </View>
            {renderItem(schedule)}
          </View>
        </View>
      ) : null}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexGrow: 1
  },
  buttonWrapper: {
    flexDirection: 'column'
  },
  scheduleWrapper: {},
  header: {
    padding: 10,
    width: '80%',
    alignSelf: 'center',
    borderBottomColor: 'rgba(0,0,0,0.5)',
    borderBottomWidth: 2,
    marginVertical: 10
  },
  headerText: {
    fontSize: 23,
    textAlign: 'center'
  },
  cardHeader: {
    fontSize: 20,
    marginBottom: 5
  },
  cardItem: {
    backgroundColor: '#eee',
    borderColor: 'rgba(0,0,0,0.1)',
    borderWidth: 1,
    padding: 20,
    marginVertical: 10,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  }
})
