import axios from 'axios'
import moment from 'moment'
const ErgastClient = axios.create({
  baseURL: 'http://ergast.com/api/f1/'
})

export const GetCurrentSchedule = async () => {
  try {
    const res = await ErgastClient.get('/current.json')
    let currentDate = new Date().getTime()
    let raceData = res.data.MRData.RaceTable.Races.map(
      ({ Circuit, raceName, time, date, round }) => ({
        id: Circuit.circuitId,
        country: Circuit.Location.country,
        locality: Circuit.Location.locality,
        circuitName: Circuit.circuitName,
        raceDate: new Date(moment(date + ' ' + time)).getTime(),
        round,
        raceName
      })
    )
    let upcoming = Infinity
    raceData.forEach((a, index) => {
      if (a.raceDate >= currentDate && a.raceDate < upcoming) {
        upcoming = { race: a, index }
      }
    })
    raceData.splice(upcoming.index, 1)
    return { upcoming: upcoming.race, raceData }
  } catch (error) {
    return error
  }
}

export const GetQualiInfo = async (round) => {
  try {
    const res = await ErgastClient.get(`/2020/${round}/qualifying.json`)
    return res.data.MRData.RaceTable.Races.map((r) => r.QualifyingResults)[0]
  } catch (error) {
    return error
  }
}

export const GetRaceResults = async (round) => {
  try {
    const res = await ErgastClient.get(`/2020/${round}/results.json`)
    return res.data.MRData.RaceTable.Races.map((r) => r.Results)[0]
  } catch (error) {
    return error
  }
}
