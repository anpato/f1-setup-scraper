import React, { useEffect } from 'react'
import { Text, View, SafeAreaView } from 'react-native'
import { useRecoilState, RecoilRoot } from 'recoil'
import { AppLoading } from './store/atoms'
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import HomeView from './views/HomeView'
import TabControl from './router/TabControl'

function Loader() {
  const [isLoading, toggleLoading] = useRecoilState(AppLoading)
  useEffect(() => {
    async function loadApp() {
      await Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font
      })
      toggleLoading(false)
    }
    loadApp()
  }, [])

  if (isLoading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    )
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TabControl />
    </SafeAreaView>
  )
}

export default function App() {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <Loader />
      </NavigationContainer>
    </RecoilRoot>
  )
}
