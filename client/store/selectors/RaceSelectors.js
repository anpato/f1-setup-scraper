import { selector } from 'recoil'
import { RaceSchedule, QualifyingResults, RaceResults } from '../atoms'

export const SetRaceSchedule = selector({
  key: 'set_race_schedule',
  get: async () => {
    let res = get(RaceSchedule)
    return res
  }
})

export const SetQualifyingResults = selector({
  key: 'set_quali_results',
  get: ({ get }) => {
    return get(QualifyingResults)
  },
  set: ({ set }, value) => {
    set(QualifyingResults, value)
  }
})

export const SetRaceResults = selector({
  key: 'set_race_results',
  get: ({ get }) => {
    return get(RaceResults)
  },
  set: ({ set }, value) => {
    return set(RaceResults, value)
  }
})
