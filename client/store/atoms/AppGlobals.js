import { atom } from 'recoil'

export const AppLoading = atom({
  key: 'app_loading',
  default: true
})

export const ModelStatus = atom({
  key: 'modal_status',
  default: false
})
