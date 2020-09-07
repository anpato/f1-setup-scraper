import { atom } from 'recoil'

export const RaceSchedule = atom({
  key: 'race_schedule',
  default: []
})

export const UpComingRace = atom({
  key: 'upcoming_race',
  default: null
})

export const QualifyingResults = atom({
  key: 'quali_results',
  default: []
})

export const RaceResults = atom({
  key: 'race_results',
  default: []
})
